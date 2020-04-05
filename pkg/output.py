
import pandas as pd
import json



class output():
    
    @staticmethod
    def add_peak(dtf):
        data_max = dtf["delta_data"].max()
        forecast_max = dtf["delta_forecast"].max()
        if data_max >= forecast_max:
            peak = dtf[dtf["delta_data"]==data_max].index[0]
            return peak, data_max
        else:
            peak = dtf[dtf["delta_forecast"]==forecast_max].index[0]
            return peak, forecast_max
        
    
    @staticmethod
    def save(dic, path):
        with open(path+'data.json', mode='w') as json_file:
            json.dump(dic, json_file, indent=4, separators=(',',' : '))
        
    
    def create_json(self, dtf):
        dtf.index = dtf.index.strftime("%d/%m/%Y")
        self.dic = {}
        
        ## main data
        self.dic["days"] = [{"day":k, "data":v} for k,v in dtf.to_dict("index").items()]
        
        ## total cases
        self.dic["total_cases_until_today"] = dtf["data"].max()
        self.dic["total_cases_in_30days"] = dtf["forecast"].max()
        
        ## active cases
        self.dic["active_cases_today"] = dtf["delta_data"].max()
        self.dic["active_cases_in_30days"] = dtf["delta_forecast"].max()
        
        ## peak
        peak_day, peak_data = self.add_peak(dtf)
        self.dic["peak"] = {"day":peak_day,"data":peak_data}
    
