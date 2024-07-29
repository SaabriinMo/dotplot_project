import pandas as pd
import datacleaning
import dbutils

data_cleaning = datacleaning.DataCleaning()
db_utils = dbutils.DatabaseUtils()

def main():

    # load data
    patients_df = pd.read_csv("Patients.csv")
    us_scan_df = pd.read_csv("US_scans.csv")

    # clean data
    patients_df = data_cleaning.clean_patient_data(patients_df)
    us_scan_df = data_cleaning.clean_us_scan_data(us_scan_df)
    
    # load to database
    db_utils.connect_to_db(patients_df, "patients_table")
    db_utils.connect_to_db(us_scan_df, "us_scan_table")

if __name__ == "__main__":
    main()