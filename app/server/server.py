###############################################################################
#                                MAIN                                         #
###############################################################################

import flask

from pkg.data import data
from pkg.model import model
from pkg.output import output
from config.file_system import *

from flask import request, make_response
import json


'''
'''
def create_app(name=None):
    ## app object
    name = name if name is not None else __name__
    app = flask.Flask(name, instance_relative_config=True, 
                      template_folder=dirpath+'app/client/templates',
                      static_folder=dirpath+'app/client/static')
    
    
    ## api
    @app.route('/ping', methods=["GET"])
    def ping():
        return 'pong'

    @app.route('/get-chart-data', methods=["GET"])
    def getChartData():
        try:
            country = request.args.get("country", 0, type=str)

            return json.dumps({
                "root": {
                    "exit_status": 0,
                    "message": "",
                    "data": {
                        "country": country,
                        "peak": "15/04/2020",
                        "days": []
                    }
                }
            })
        except Exception as e:
            '''app.logger.error(e)'''
            return json.dumps({
                "root": {
                    "exit_status": -1,
                    "message": str(e)
                }
            })

    @app.route("/", methods=['GET', 'POST'])
    def index():
        try:
            ts = data()
            ts.get_data()
            app.logger.info("--- Got Data ---")
            
            lst_dtfs = []
            for country in ts.countrylist: 
                app.logger.info(country)
                ts.process_data(country)   
                if ts.cases["data"].max() < 1000:
                    next
                else:
                    logistic = model()
                    logistic.forecast(ts.cases)
                    logistic.add_deaths(ts.mortality)
                    lst_dtfs.append((country, logistic.dtf_out))
            app.logger.info("--- Model Run ---")
            
            dic_data = {}
            for country,dtf in lst_dtfs:
                json = output()
                json.create_json(dtf)
                dic_data[country] = json.dic
            json.save(dic_data, dirpath+'app/client/data/')
            app.logger.info("--- Saved Json ---")

            
            
            if flask.request.method == 'POST':
                country = flask.request.form["country"]
                app.logger.info("Selected "+ country)
            else:
                country = "World"
            
            ts.process_data(country)
            
            logistic = model()
            logistic.forecast(ts.cases)
            logistic.add_deaths(ts.mortality)
            img = logistic.plot(country)
            app.logger.info("--- Model Run ---")
            
            # json = output()
            # json.create_json(logistic.dtf_out, country)
            # json.save(dirpath+'app/client/data/')
            # app.logger.info("--- Saved Json ---")
            
            return flask.render_template("index.html", img=img, country=country, countrylist=ts.countrylist)
            
        except Exception as e:
            app.logger.error(e)
            flask.abort(500)
    
    
    ## errors
    @app.errorhandler(404)
    def page_not_found(e):
        return flask.render_template("errors.html", msg="Page doesn't exist"), 404
    
    @app.errorhandler(500)
    def internal_server_error(e):
        return flask.render_template('errors.html', msg="Something went terribly wrong"), 500
    
    
    return app