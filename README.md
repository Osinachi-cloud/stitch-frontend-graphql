# TaxReporting Application (VAT)


## Project Description


The Value added tax application is a maker-checker application that is designed to organize and send report from the application to E-tranzact monthly for all the states in Nigeria. The following data is contained in the report: tax amount, transaction amount, vat Rate, state, description and invoiceId.


### Key Features
- **Role based Authentication**:Login either as an Initiator, Approver, Admin, Audit.
- **Report Search Functionality**: Only Initiators and Approvers can search for Report of a particular month.
- **Report Initiation**: Only Initiators can initiate a report for a particular month as the maker.
- **Report Approval**: Only Approver can approve or reject the report for a particular month following the initiator's process.
- **Report sending**: Only Approver can send the report for a particular month for the 36 states following the approval process.
- **User Search Functionality**: Admins and Audit can search for users.
- **User Management**: Admins can manage users: create users, edit users, change a user's role.
- **User Activity Monitoring**: Audits can monitor user activity management.
- **Notification**: Notification happens whenever and initiation or approval process happens.
- **File upload**: An Initiator can upload an excel file containing the data he wants to report for.
- **File download**: An Initiator or approver can download an excel file containing the data to examine them. 


### Report Status
- **Pending**:when a report is validated and initiated by initiator.
- **Cancelled**:when a report is invalidated by the initiator.
- **Approved**: when a report is  validated following the initiation of the initiator.
- **Rejected**: When a report is invalidated by the approver.


### Roles
- **Initiator**
- **Approver**
- **Audit**
- **Admin**



## Technologies Used
- **Java**: 17
- **Spring Boot**: 3.4.2
- **PostgreSQL**: Database
- **Maven**: Dependency management
- **JUnit & Mockito**: Testing framework


## Setup Instructions


### Prerequisites
- Java 17
- PostgreSQL database
- Maven


### Database Setup
1. Update the `application.properties` file with your DB credentials.


### Clone the Repository
```bash
git clone https://gitlab.com/uba-cio-team2/tax-report-for-etz
cd tax-reports
```


### Run the application
```bash
mvn clean install -DskipTests
mvn spring-boot:run

```


### Summary
- **API Endpoints**: A comprehensive list of all the API endpoints, including their methods, request bodies, and expected responses is provided in the postman docs url below.
- **Port Information**: the application will be accessible at `http://localhost:9192` after running.
- **Postman endpoints Docs**: https://holiday-service.postman.co/workspace/VAT~bf40c91a-c442-4494-a045-1af883897362/collection/15320288-d25d7a3e-1ba8-40d6-81f9-28ae4bb87f6b?action=share&creator=15320288


### Database (Relation Db: Oracle and Postgres)
```bash
1. Posgres DB: (postvatuser) for User management
2. Finacle DR: (finvatuser) for spooling vat records
3. Softlive: (softvatuser) for organizing and storing Vat report records.

```

### Other dependencies and features
```bash
1. RSA encryption for e-transact data.
2. JWT token based token authentication and authorization.
3. Paperless Authentication API.
4. Entrust 2 factor Authentication API.
5. E-transact API.
6. Spring security

```


### User flow
```bash
+--------------------+            +---------------------+                          +---------------------+
|                    |            |                     |                          |                     |
|  Taxreporting DB   |            |    Softvatuser DB   |                          |    Finacle  DR      |
|  ([User Auth])     |            |                     |                          |                     |
| +------------------+            +---------------------+                          +---------------------+
    ^    |                                   ^                                                  |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |   User Authentication/            |                                                  |
    |    |   User Management                 | Save VAT records                                 |
    |    |                                   |                                 background job   | VAT records transfer                                                                                              |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |                                   |                                                  |
    |    |                          +-------------------+                                       |
    |    |                          |                   |        Retrieve VAT records           |
    |    +------------------------->|  VAT Application  |<-------------------------------------+
    +-------------------------------|                   |                            
                                    |                   | <--------------------------------
                                    +-------------------+                                 |
                                     |   ^         ^  |                                   |
           Data retrieval            |   |         |  | Data Retrieval                    |
    +--------------------------------+   |         |  |                                   |                          
    |      Initiate Data                 |         |  |                                   |
    |    --------------------------------+         |  |                                   |                           
    |    |                                         |  |                                   |
    v    |                        Appove reports   |  v                                   |
+----------------+                      +----------------+                                |         
| Initiator      |--------------------->|   Approver     |                                |         
|                |                      |                |                                |
+----------------+                      +----------------+                                |         
                                             |                                            |
                                             |                                            |
        +------------------------------------+                                            |                   
        |                                                                                 |
        |        +------------------------------------------------------------------------+      
        |        |      Response from E-tranzact
        |        |       
        v        |
+------------------+
|    e-Tranzact    |
+------------------+


```


### API endpoint Docs
```bash

BASEURL:https://10.100.16.101:3200


Login
{
    "request": {
    "method": "POST",
    "url": "{{BASEURL}}/login",
    "headers": {
    "Content-Type": "application/json"
    },
        "body": {
        "username": {{email}},
        "password": {{encrypted password}},
        "entrustToken": {{EntrustToken}}
        }
    }
}


Edit user role

Authorized User: Admin
{
    "request": {
    "method": "POST",
    "url": {{BASEURL}}/create-user-role,
    "headers": {
    "Content-Type": "application/json",
    "Authorization": {{Auth Token}}
    },
        "body": {
        "username": {{email}},
        "role": {{role Name}}
        }
    }
}


Create user role

Authorized User: Admin
{
    "request": {
    "method": "POST",
    "url": {{BASEURL}}/create-role,
    "headers": {
    "Content-Type": "application/json",
    "Authorization": {{Auth token}}
        },
        "body": {
        "name": {{role name}},
        "description": {{description}}
        }
    }
}


GET all Users

Authorized User: Admin

{
    "request": {
    "method": "GET",
    "url": {{BASEURL}}/users?size=20,
        "headers": {
        "Authorization": {{Auth token}}
        }
    }
}


Download Activity records

Authorized User: Audit
{
    "request": {
    "method": "GET",
    "url":{{BASEURL}}/audits-download",
        "headers": {
        "Authorization": {{Auth token}}
        }
    }
}


Get VAT records
Authorized User: Initiator / Approver

{
    "request": {
    "method": "GET",
    "url":{{BASEURL}}/tax-reporting?page=1&size=200&startDate=2019-04-02&endDate=2019-04-31",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}


Download RAW VAT records by sol  in excel

Authorized User: Initiator / Approver
{
    "request": {
    "method": "GET",
    "url":{{BASEURL}}/downloadExcel?page=1&size=20&startDate=2022-08-24&endDate=2024-10-24",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}




Send Report to E-tranzact
Authorized User:  Approver

{
    "request": {
    "method": "POST",
    "url": {{BASEURL}}/send-report?month=SEP&startDate=2019-01-01&endDate=2024-09-27",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}


Invalidate Report
Authorized User:  Approver/ Initiator

{
    "request": {
    "method": "POST",
    "url": {{BASEURL}}/send-report?month=SEP&startDate=2019-01-01&endDate=2024-09-27",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}


Validate Report
Authorized User:  Approver/ Initiator


{
    "request": {
    "method": "POST",
    "url":{{BASEURL}}/validate-tax-report?month=DECEMBER&startDate=2024-01-01&endDate=2024-10-27",
        "headers": {
        "Content-Type": "application/json",
        "Authorization": {{Auth Token}}
        }
    }
}


1. InValidate Report
    Authorized User:  Approver/ Initiator


{
    "request": {
    "method": "POST",
    "url":{{BASEURL}}/invalidate-tax-report?month=DECEMBER&startDate=2024-01-01&endDate=2024-10-27",
    "headers": {
    "Content-Type": "application/json",
    "Authorization": {{Auth Token}}
    },
        "body": {
        "reason": "{{reason}}"
        }
    }
}




Gets summary of month’s report for all 37 states
Authorized User:  Approver/ Initiator

{
    "request": {
    "method": "GET",
    "url":{{BASEURL}}/report-per-month?startDate=2024-01-01&endDate=2024-12-31",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}


Manual upload of excel file.
Authorized User:  Initiator
{
    "request": {
    "method": "POST",
    "url":"{{BASEURL}}/vat-file-upload?month=DECEMBER&year=2024",
    "headers": {
    "Authorization": {{Auth Token}}
    },
        "body": {
        "file": "file_path/UBA PLC - December 2024 VAT data 22012025.xlsx"
        }
    }
}


Summarizes and creates VAT records per month.
Authorized User:  Initiator
{
    "request": {
    "method": "POST",
    "url":{{BASEURL}}/pull-finacle-report?year=2024&month=DECEMBER",
        "headers": {
        "Authorization": {{Auth Token}}
        }
    }
}



Downloads summarized VAT reports
Authorized User:  Initiator
{
    "request": {
    "method": "GET",
    "url":{{BASEURL}}/excel-download?year=2024&month=AUGUST",
        "headers": {
        "Authorization": {{Auth Token}}
        },
    "body": {}
    }
}

```



