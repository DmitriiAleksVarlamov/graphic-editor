# Progect helps to work with images, cut, compress and change format

## Start project

### DEV
- Start project in dev mode:
    * pnpn run dev

### PROD
- Create docker image:
    * docker build -t gr . [ 
        _ -t gr _ - define the Tag name for image, 
        _ . _ - path to the Dockerfile
    ]
- Start container:
    * docker run -i -t -p 8000:8000 --name grapp gr