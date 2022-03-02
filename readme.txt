Problem Statement:
The goal of this tutorial is to use GitHub to track created and closed issues of a given repository(angular, material-design, angular-cli,D3)
for the past year along with timeseries forecasting using Tensorflow/LSTM Keras and will then see how to deploy it to gcloud platform.

Solution:
Step 1: We are creating three microservices:
        1. React 
        2. Flask
        3. LSTM/Keras

Step 2: What will React do?
        1. React will retrieve GitHub created and closed issues for a given repository and will display the bar-charts of same using high-charts        
        2. It will also display the images of the forecasted data for the given GitHub repository and images are being retrieved from GCP storage
        3. React will make a fetch api call to flask microservice and method will be POST and body will be in object format.

Step 3: Deploying React to gcloud platform
        1: You must have Docker(https://www.docker.com/get-started) and Google Cloud SDK(https://cloud.google.com/sdk/docs/install) 
           installed on your computer. Then, Create a gcloud project and enable the billing account.

        2: Type `docker` on cmd terminal and press enter to get all required information

        3: Type `docker build .` on cmd to build a docker image

        4: Type `docker images` on cmd to see our first docker image. After hitting enter, newest created image will be always on the top of the list

        5: Now type `docker tag <your newest image id> gcr.io/<your project-id>/<project-name>` and hit enter 
            Type `docker images` to see your image id updated with tag name

        6: Type `gcloud init` on cmd

        7: Type `gcloud auth configure-docker` on cmd

        8: Go to your GCloud account and open container registry

        9: Enable your billing account

        10: Enable your Container Registry API

        11: Go to the Cloud Build and enable Cloud Build API

        12: Type `docker push <your newest created tag>` on cmd and hit enter

        13: Go to cloud run and create new service, service name will be your GCloud project name and for container
            image url hit select and selects your latest id and hit select and edit container port to '80', increase 
            the memory limit to 1GiB.
            
        14: This will create the service on port 80 and will generate the url, hit the url.   

Step 4: To run locally, go to cmd terminal and type following: 
        1. npm install
        2. npm start            
