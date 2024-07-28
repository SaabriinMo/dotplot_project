from sqlalchemy import create_engine # type: ignore
import pandas as pd


class DatabaseUtils:

    """
    Database Connector class provides the bases to connect to the database for data loading
    """

    def __init__(self):
        self.cred = {"DATABASE_TYPE" : 'postgresql', "DBAPI": 'psycopg2', 'HOST': 'localhost', 
                      'USER': 'postgres', "PASSWORD": 'xxx', 'DATABASE': 'dotplot_data', 'PORT':5432}
        
        

    def connect_to_db(self, df, table_name):
        """
        this function connects to the database and upload the dataframes to the database

        Parameters:
        -----------
        df: DataFrame
            the cleaned dataframe to upload to database

        table_name: str

        Returns:
        --------
            None
        """
        engine = create_engine(f"{self.cred['DATABASE_TYPE']}+{self.cred['DBAPI']}://{self.cred['USER']}:{self.cred['PASSWORD']}@{self.cred['HOST']}:{self.cred['PORT']}/{self.cred['DATABASE']}")
        engine.connect()
        df.to_sql(table_name, engine, if_exists='replace', index=False)
    

