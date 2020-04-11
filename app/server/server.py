###############################################################################
#                                MAIN                                         #
###############################################################################

### import pdb

import flask
import json

from pkg.data import Data
from pkg.model import Model
from pkg.output import Output
from config.file_system import *



'''
'''
def forecast_country(country, data, model, ouput):
    data.process_data(country)   
    model.forecast(data.cases)
    model.add_deaths(data.mortality)
    ouput.create_output(model.dtf_out, country)
    ### return json.dumps(ouput.dic)
    return ouput.dic
    


'''
'''
def create_app(name=None):
    ## app object
    name = name if name is not None else __name__
    app = flask.Flask(name, instance_relative_config=True, 
                      ### template_folder=dirpath+'app/client/templates',
                      ### static_folder=dirpath+'app/client/static')
                      template_folder=dirpath+'app/client_v2/src/html',
                      static_folder=dirpath+'app/client_v2/src')
    ### app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    default_country = "World"
    
    
    ## api
    @app.route('/ping', methods=["GET"])
    def ping():
        return json.dumps({'ping':'pong'})
    
    
    @app.route("/", methods=['GET', 'POST'])
    def index():
        try:
            ### pdb.set_trace()

            ### init 
            data, model, output = Data(), Model(), Output()
            
            ### read data
            data.get_data()
            
            ### define country
            #country = flask.request.form["country"] if flask.request.method == 'POST' else default_country
            #country = default_country
            #app.logger.info("Selected "+ country)
            
            ### calculate output 
            ### json_out = forecast_country(default_country, data, model, output)
            ### return flask.render_template("index.html", json_out=json.dumps(json_out), country=default_country, countrylist=data.countrylist)
            return flask.render_template("index.html", json_out="", country=default_country, countrylist=data.countrylist)

        except Exception as e:
            app.logger.error(e)
            flask.abort(500)


    @app.route('/get-chart-data', methods=["GET"])
    def getChartData():
        try:
            ### init 
            data, model, output = Data(), Model(), Output()
            
            ### read data
            data.get_data()
            
            ### define country
            country = flask.request.args.get("country", 0, type=str)
            if not country:
                country = default_country
            app.logger.info("Selected "+ country)
            
            ### calculate output
            json_out = forecast_country(country, data, model, output)
            return  {"root": {"exit_status":0,
                              "message": "",
                              "data": json_out
                              }}
        except Exception as e:
            app.logger.error(e)
            return json.dumps({"root": {"exit_status": -1,
                                        "message": str(e)
                                        }})

    
    ## errors
    @app.errorhandler(404)
    def page_not_found(e):
        return flask.render_template("errors.html", msg="Page doesn't exist"), 404
    
    @app.errorhandler(500)
    def internal_server_error(e):
        ### return flask.render_template('errors.html', msg="Something went terribly wrong"), 500
        return flask.render_template('errors.html', msg=str(e)), 500
    
    
    return app