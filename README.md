# AirBnB clone - Web Dynamic

<img align="center" alt="AirBnb_clone_logo" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/AirBnB_clone.png?raw=true" />


## AirBnB clone Overview

 The goal of the project is to build a simple copy of the [AirBnB website](https://www.airbnb.com/)

 Here is a preview of the final product.

 <img align="center" alt="AirBnb_final_product" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/AirBnB_final_product.png?raw=true" />

At the end of the project the complete web application will be composed by:

- __A command interpreter__ to manipulate data without a visual interface, like in a Shell (perfect for development and debugging)
- __A website (the front-end)__ that shows the final product to everybody: static and dynamic
- __A database or files__ that store data (data = objects)
- __An API__ that provides a communication interface between the front-end and the data (retrieve, create, delete, update them)


### AirBnB clone Web Dynamic stage

The following is a diagram of this stage related with making the Web Dynamic:

In this stage, the main objectives are:

* Use Jquery to make the web dynamic
* Load objects from the client side by using the RESTful API

 <img align="center" alt="AirBnb_web_dynamic_diagram" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/AirBnB_web_dynamic.png?raw=true" />


## Table of Contents

1.  [AirBnB clone Overview](#airbnb-clone-overview)
2.  [AirBnB clone RESTful API stage](#airbnb-clone-restful-api-stage)
3.  [Development Environment](#development-environment)
4.  [File Structure](#file-structure)
5.  [Local Environment Set Up](#local-environment-set-up)
6.  [Run Flask](#run-flask)
7.  [API Usage](#api-usage)
8.  [Unit tests](#unit-tests)
9.  [Authors](#authors)
10.  [License](#license)

## Development Environment

This project was built/tested on the following environments:
* Ubuntu linux 20.04 LTS using python3 (version 3.8.5)
* Arch linux 6.1.46-1-LTS

## File Structure

For the implementation, the following file structure was defined:

```sh
[cristian@Arch holbertonschool-AirBnB_clone_v4]$ tree .
.
├── 0-setup_web_static.sh
├── 1-pack_web_static.py
├── 2-do_deploy_web_static.py
├── 3-deploy_web_static.py
├── api
│   ├── __init__.py
│   └── v1
│       ├── app.py
│       ├── __init__.py
│       └── views
│           ├── amenities.py
│           ├── cities.py
│           ├── documentation
│           │   ├── amenity
│           │   │   ├── all_amenities.yml
│           │   │   ├── delete_amenity.yml
│           │   │   ├── get_amenity.yml
│           │   │   ├── post_amenity.yml
│           │   │   └── put_amenity.yml
│           │   ├── city
│           │   │   ├── cities_by_state.yml
│           │   │   ├── delete_city.yml
│           │   │   ├── get_city.yml
│           │   │   ├── post_city.yml
│           │   │   └── put_city.yml
│           │   ├── place
│           │   │   ├── delete_place.yml
│           │   │   ├── get_places.yml
│           │   │   ├── get_place.yml
│           │   │   ├── post_place.yml
│           │   │   ├── post_search.yml
│           │   │   └── put_place.yml
│           │   ├── place_amenity
│           │   │   ├── delete_place_amenities.yml
│           │   │   ├── get_places_amenities.yml
│           │   │   └── post_place_amenities.yml
│           │   ├── reviews
│           │   │   ├── delete_reviews.yml
│           │   │   ├── get_reviews.yml
│           │   │   ├── get_review.yml
│           │   │   ├── post_reviews.yml
│           │   │   └── put_reviews.yml
│           │   ├── state
│           │   │   ├── delete_state.yml
│           │   │   ├── get_id_state.yml
│           │   │   ├── get_state.yml
│           │   │   ├── post_state.yml
│           │   │   └── put_state.yml
│           │   └── user
│           │       ├── all_users.yml
│           │       ├── delete_user.yml
│           │       ├── get_user.yml
│           │       ├── post_user.yml
│           │       └── put_user.yml
│           ├── index.py
│           ├── __init__.py
│           ├── places_amenities.py
│           ├── places.py
│           ├── places_reviews.py
│           ├── states.py
│           └── users.py
├── AUTHORS
├── code_review.txt
├── console.py
├── models
│   ├── amenity.py
│   ├── base_model.py
│   ├── city.py
│   ├── engine
│   │   ├── db_storage.py
│   │   ├── file_storage.py
│   │   └── __init__.py
│   ├── __init__.py
│   ├── place.py
│   ├── review.py
│   ├── state.py
│   └── user.py
├── README.md
├── setup_mysql_dev.sql
├── setup_mysql_test.sql
├── tests
│   ├── __init__.py
│   ├── test_console.py
│   └── test_models
│       ├── __init__.py
│       ├── test_amenity.py
│       ├── test_base_model.py
│       ├── test_city.py
│       ├── test_engine
│       │   ├── __init__.py
│       │   ├── test_db_storage.py
│       │   └── test_file_storage.py
│       ├── test_place.py
│       ├── test_review.py
│       ├── test_state.py
│       └── test_user.py
├── web_dynamic
│   ├── 0-hbnb.py
│   ├── 1-hbnb.py
│   ├── 2-hbnb.py
│   ├── 3-hbnb.py
│   ├── 4-hbnb.py
│   ├── __init__.py
│   ├── static
│   │   ├── images
│   │   │   ├── icon_bath.png
│   │   │   ├── icon_bed.png
│   │   │   ├── icon_group.png
│   │   │   ├── icon.png
│   │   │   └── logo.png
│   │   ├── scripts
│   │   │   ├── 1-hbnb.js
│   │   │   ├── 2-hbnb.js
│   │   │   ├── 3-hbnb.js
│   │   │   └── 4-hbnb.js
│   │   └── styles
│   │       ├── 3-footer.css
│   │       ├── 3-header.css
│   │       ├── 4-common.css
│   │       ├── 6-filters.css
│   │       ├── 8-places.css
│   │       └── w3c_validator.py
│   └── templates
│       ├── 0-hbnb.html
│       ├── 1-hbnb.html
│       ├── 2-hbnb.html
│       ├── 3-hbnb.html
│       └── 4-hbnb.html
├── web_flask
│   ├── 0-hello_route.py
│   ├── 100-dump.sql
│   ├── 100-hbnb.py
│   ├── 10-hbnb_filters.py
│   ├── 1-hbnb_route.py
│   ├── 2-c_route.py
│   ├── 3-python_route.py
│   ├── 4-number_route.py
│   ├── 5-number_template.py
│   ├── 6-number_odd_or_even.py
│   ├── 7-states_list.py
│   ├── 8-cities_by_states.py
│   ├── 9-states.py
│   ├── __init__.py
│   ├── README.md
│   ├── static
│   │   ├── images
│   │   │   ├── icon_bath.png
│   │   │   ├── icon_bed.png
│   │   │   ├── icon_group.png
│   │   │   ├── icon.png
│   │   │   └── logo.png
│   │   └── styles
│   │       ├── 3-footer.css
│   │       ├── 3-header.css
│   │       ├── 4-common.css
│   │       ├── 6-filters.css
│   │       ├── 8-places.css
│   │       └── w3c_validator.py
│   └── templates
│       ├── 100-hbnb.html
│       ├── 100-hbnb.html~
│       ├── 10-hbnb_filters.html
│       ├── 5-number.html
│       ├── 6-number_odd_or_even.html
│       ├── 7-states_list.html
│       ├── 8-cities_by_states.html
│       ├── 9-states.html
│       └── w3c_validator.py
└── web_static
    ├── 0-index.html
    ├── 100-index.html
    ├── 101-index.html
    ├── 102-index.html
    ├── 103-index.html
    ├── 1-index.html
    ├── 2-index.html
    ├── 3-index.html
    ├── 4-index.html
    ├── 5-index.html
    ├── 6-index.html
    ├── 7-index.html
    ├── 8-index.html
    ├── images
    │   ├── icon_bath.png
    │   ├── icon_bed.png
    │   ├── icon_group.png
    │   ├── icon_pets.png
    │   ├── icon.png
    │   ├── icon_tv.png
    │   ├── icon_wifi.png
    │   └── logo.png
    ├── README.md
    ├── styles
    │   ├── 100-places.css
    │   ├── 101-places.css
    │   ├── 102-common.css
    │   ├── 102-filters.css
    │   ├── 102-footer.css
    │   ├── 102-header.css
    │   ├── 102-places.css
    │   ├── 102-places.css~
    │   ├── 103-common.css
    │   ├── 103-filters.css
    │   ├── 103-footer.css
    │   ├── 103-header.css
    │   ├── 103-places.css
    │   ├── 2-common.css
    │   ├── 2-footer.css
    │   ├── 2-header.css
    │   ├── 3-common.css
    │   ├── 3-footer.css
    │   ├── 3-header.css
    │   ├── 4-common.css
    │   ├── 4-filters.css
    │   ├── 5-filters.css
    │   ├── 6-filters.css
    │   ├── 7-places.css
    │   └── 8-places.css
    └── w3c_validator.py

31 directories, 189 files
```

## Local Environment Set Up

### Pre-requisites

0. Make sure that MySQL started:

```sh
service mysql start
```
1. Make sure that the user root, password root exist

2. Install Flask
```sh
pip3 install Flask
```
3. Install the FLask version of Swagger: [Flasgger](https://github.com/flasgger/flasgger)
```sh
pip3 install flasgger
```

### Data Set Up

1. Clone this repository: 
```sh
git clone https://github.com/cristian-encalada/holbertonschool-AirBnB_clone_v4.git
```
2. Access AirBnb directory: 
```sh
cd holbertonschool-AirBnB_clone_v4
```

3. Download this SQL dump file
```sh
curl -o data.sql "https://raw.githubusercontent.com/cristian-encalada/holbertonschool-AirBnB_clone/assets/API_assets/db_data.sql"
```
4. Remove the database (to avoid possible problems with foreign keys)
```sh
echo "DROP DATABASE IF EXISTS hbnb_dev_db;" | mysql -h localhost -u root -proot
```
5. Set up the development environment:

```sh
cat setup_mysql_dev.sql | mysql -hlocalhost -uroot -proot
```
6. Restore the SQL dump file
```sh
cat data.sql | mysql -uroot -proot
```

## Run Flask

1. Start the Flask application (port 5000)

```sh
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db python3 -m web_dynamic.4-hbnb
```
The output should be:

```sh
 * Serving Flask app '4-hbnb'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.0.136:5000
Press CTRL+C to quit
```

1. From a different terminal, start the Restful APIs (port 5001)

```sh
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app
```
The output should be:

```sh
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5001
 * Running on http://192.168.0.136:5001
Press CTRL+C to quit
```

## API usage

1. Open this URL in the web browser::
```
http://0.0.0.0:5000/apidocs/#/
```

2. From here, you can test all API endpoints through the __Swagger__ interface:
For example, the endpoint GET​ `/api​/v1​/states​/` looks this way:

<img align="center" alt="API_GET_states_test" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/API_assets/API-GET_states_test.png?raw=true" />

__Response body:  200__
```JSON
[
  {
    "__class__": "State",
    "created_at": "2023-08-25T23:36:26.000000",
    "id": "27554ff5-219d-47bb-b8ad-15d4077b4fd0",
    "name": "California",
    "updated_at": "2023-08-25T23:36:26.000000"
  }
]
```

### List of API endpoints available

<img align="center" alt="API_endpoints_list1" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/API_assets/API_endpoints1.png?raw=true" />

<img align="center" alt="API_endpoints_list2" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/API_assets/API_endpoints2.png?raw=true" />

<img align="center" alt="API_endpoints_list3" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/API_assets/API_endpoints3.png?raw=true" />

<img align="center" alt="API_endpoints_list4" src="https://github.com/cristian-encalada/holbertonschool-AirBnB_clone/blob/assets/API_assets/API_endpoints4.png?raw=true" />

## Unit tests

All unittests pass without any errors at anytime in this project, with each storage engine.

__Unit tests related to File storage (JSON format)__

```sh
[cristian@Arch holbertonschool-AirBnB_clone_v4]$ python3 -m unittest discover tests
/home/cristian/.pyenv/versions/3.8.5/lib/python3.8/site-packages/pep8.py:110: FutureWarning: Possible nested set at position 1
  EXTRANEOUS_WHITESPACE_REGEX = re.compile(r'[[({] | []}),;:]')
.........................................ss..ss.................................................................
----------------------------------------------------------------------
Ran 112 tests in 0.344s

OK (skipped=4)
```

__Unit tests related to DB storage__

```sh
[cristian@Arch holbertonschool-AirBnB_clone_v4]$ HBNB_ENV=test HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db python3 -m unittest discover tests
/home/cristian/.pyenv/versions/3.8.5/lib/python3.8/site-packages/pep8.py:110: FutureWarning: Possible nested set at position 1
  EXTRANEOUS_WHITESPACE_REGEX = re.compile(r'[[({] | []}),;:]')
...............................................sssss.....s......................................................
----------------------------------------------------------------------
Ran 112 tests in 0.564s

OK (skipped=6)
```

## Authors

__AirBnB clone - RESTful API__

* Alexa Orrico - [Github](https://github.com/alexaorrico) / [Twitter](https://twitter.com/alexa_orrico)  
* Jennifer Huang - [Github](https://github.com/jhuang10123) / [Twitter](https://twitter.com/earthtojhuang)

__AirBnB clone - MySQL__

* Joann Vuong [Github](https://github.com/joannvuong)

__AirBnB clone - RESTful API__

* __Jhoan Zamora__ - [Github](https://github.com/jzamora5)

__AirBnB clone - Web Dynamic__

* __Cristian Encalada__ - [Github](https://github.com/cristian-encalada)
* __Sol Puente__ - [Github](https://github.com/solp22)

## License
Public Domain. No copy write protection. 
