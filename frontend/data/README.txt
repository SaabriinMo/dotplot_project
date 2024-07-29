Dataset

The dataset consists of 80 US images and two .csv file with the corresponding metadata. The "Patients" csv contains all information on the patients who have had an ultrasound scan indicating a lesion. Each patient has a unique ID, information about name, age, height, weight and the history of breast cancer. The ultrasound scans corresponding to this patient are identifiable by the ID. Detailed information of each US scan can be found in the "US_scans" csv. All patient IDs and US scan IDs are always unique. The coordinates indicate the location of where the US scan was acquired, corresponding to the grid overlay shown in the "coordinates.png" file. 

A 3D model of a female torso is supplied and can be found in the "torso.obj" file. This is the model that is meant to be read in and the lesion information visualized on. 


The US images were taken from this dataset:
Al-Dhabyani W, Gomaa M, Khaled H, Fahmy A. Dataset of breast ultrasound images. Data in Brief. 2020 Feb;28:104863. DOI: 10.1016/j.dib.2019.104863.
