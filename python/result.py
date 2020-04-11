
import pandas as pd
import plotly.graph_objects as go



class Result():
    
    def __init__(self, dtf):
        self.dtf = dtf
        
    
    @staticmethod
    def calculate_peak(dtf):
        data_max = dtf["delta_data"].max()
        forecast_max = dtf["delta_forecast"].max()
        if data_max >= forecast_max:
            peak_day = dtf[dtf["delta_data"]==data_max].index[0]
            return peak_day, data_max
        else:
            peak_day = dtf[dtf["delta_forecast"]==forecast_max].index[0]
            return peak_day, forecast_max
    
    
    @staticmethod
    def calculate_max(dtf):
        total_cases_until_today = dtf["data"].max()
        total_cases_in_30days = dtf["forecast"].max()
        active_cases_today = dtf["delta_data"].max()
        active_cases_in_30days = dtf["delta_forecast"].max()
        return total_cases_until_today, total_cases_in_30days, active_cases_today, active_cases_in_30days


    def plot_total(self, today):
        ## main plots
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=self.dtf.index, y=self.dtf["data"], mode='markers', name='data'))
        fig.add_trace(go.Scatter(x=self.dtf.index, y=self.dtf["forecast"], mode='none', name='forecast', fill='tozeroy'))
        fig.add_trace(go.Bar(x=self.dtf.index, y=self.dtf["deaths"], name='deaths', marker_color='red'))
        ## add slider
        fig.update_xaxes(rangeslider_visible=True)    
        ## add title
        fig.update_layout(title_text="Total cases")        
        ## add vline
        fig.add_shape({"x0":today, "x1":today, "y0":0, "y1":self.dtf["forecast"].max(), 
                       "type":"line", "line":{"width":2,"dash":"dot"} })
        fig.add_trace(go.Scatter(x=[today], y=[self.dtf["forecast"].max()], text=["today"], mode="text", showlegend=False))
        return fig
        
        
    def plot_active(self, today):
        ## main plots
        fig = go.Figure()
        fig.add_trace(go.Bar(x=self.dtf.index, y=self.dtf["delta_data"], showlegend=False))
        fig.add_trace(go.Scatter(x=self.dtf.index, y=self.dtf["delta_forecast"], mode='none', showlegend=False, fill='tozeroy'))
        ## add slider
        fig.update_xaxes(rangeslider_visible=True)
        ## add title
        fig.update_layout(title_text="Active cases") 
        ## add vline
        fig.add_shape({"x0":today, "x1":today, "y0":0, "y1":self.dtf["delta_forecast"].max(), 
                       "type":"line", "line":{"width":2,"dash":"dot"} })
        fig.add_trace(go.Scatter(x=[today], y=[self.dtf["delta_forecast"].max()], text=["today"], mode="text", showlegend=False))
        return fig
    
        
    def get_panel(self):
        peak_day, num_max = self.calculate_peak(self.dtf)
        total_cases_until_today, total_cases_in_30days, active_cases_today, active_cases_in_30days = self.calculate_max(self.dtf)
        return peak_day, num_max, total_cases_until_today, total_cases_in_30days, active_cases_today, active_cases_in_30days