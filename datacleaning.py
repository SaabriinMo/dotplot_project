import pandas as pd

class DataCleaning:

    """
    This class cleans the patients and us scans tables from any inconsistencies and returns the right
    datatypes.

    Methods:
    ---------
        clean_patient_data(df)
            cleans the patients dataframe
        
        clean_us_scan_data(df)
            cleans the us scans dataframe

        seperate_patient_name(df) 
            seperates the patient's first and last name
        
        split_scan_id(df, column_name)
            splits rows containing us multiple scans id and seperates it into different 
            rows

        change_type(df, column, dtype)
            changes the columns datatypes
        
        rearrange_columns(df)
            rearrange the order of columns

        clean_date(df, column_name)
            cleans the dates columns
                
    """

    def clean_patient_data(self,df):
        """
        cleans the patients dataframe from any inconsistencies

        Parameters:
        ----------  
            df: DataFrame
                the dataframe to be cleaned   

        Returns:
        --------
            df: DataFrame
                the cleaned dataframe 
        """
        self.seperate_patient_name(df)
        df = self.split_scan_id(df, "US scan ID")
        self.change_type(df, 'US scan ID', int)
        self.change_type(df, 'First Name', str)
        self.change_type(df, 'Last Name', str)
        df = self.rearrange_columns(df)
        return df
    
    def clean_us_scan_data(self, df):
        """
        cleans the us scans dataframe from any inconsistencies

        Parameters:
        ----------  
            df: DataFrame
                the dataframe to be cleaned   

        Returns:
        --------
            df: DataFrame
                the cleaned dataframe 
        """
        self.clean_date(df, "Scan Date")
        self.change_type(df, 'US scan ID', int)
        df.drop(df[df['US scan ID'] == 467].index, inplace=True)
        return df

    def seperate_patient_name(self, df):
        """
        Seperates the patients name's column into first and last name columns
        
        Parameters:
        ----------  
            df: DataFrame
                the dataframe containing the patients name  
        """
        split_patient_name = df['Patient Name'].str.split(" ").tolist()
        df[['First Name', 'Last Name']] = pd.DataFrame(split_patient_name, index=df.index)
        df.drop(["Patient Name"], axis=1, inplace=True)

    def split_scan_id(self, df, column_name):
        """
        splits the scans id column into multiple rows for patients with multiple scans

        Parameters:
        ----------  
            df: DataFrame
                the dataframe containing the multiple scans id  

        Returns:
        --------
            df: DataFrame
                the dataframe spliting multiple scans id into diferent rows 
        """
        df[column_name] = df[column_name].str.split()
        df = df.explode(column_name)
        return df

    def change_type(self, df, column_name, dtype):
        """
        changes the datatype of a column

        Parameters:
        ----------  
            df: DataFrame
                the dataframe with incorrect datatype

            column_name: str
                the column name in the dataframe
            
            dtypes: type
                the desired datatype 
            

        Returns:
        --------
            None
        """
        df[column_name] = df[column_name].astype(dtype)

    def rearrange_columns(self,df):
        """
        rearrange the columns in a datafram

        Parameters:
        ----------  
            df: DataFrame
                the dataframe in incorrect orders

        Returns:
        --------
            df: Dataframe
                the dataframe with a more coherent order
        """
        df = df.iloc[:, [0,6,7,1,2,3,4,5]]
        return df

    def clean_date(self, df, column_name):
        """
        This function cleans the date columns

        Parameters:
        -----------
            df: DataFrame
                the dataframe in question

            column_name: str
                the column name containing the dates of scans 
        """

        df[column_name] = df[column_name].apply(pd.to_datetime,
                                                infer_datetime_format=True,
                                                errors='coerce')

# if __name__ == "__main__":
#     data_cleaning = DataCleaning()
#     us_scan_df = pd.read_csv("US_scans.csv")
#     us_scan_new = data_cleaning.clean_us_scan_data(us_scan_df)
#     patients_df = pd.read_csv("Patients.csv")
#     patients_df_new = data_cleaning.clean_patient_data(patients_df)
    


