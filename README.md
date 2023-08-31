# Address Autocomplete Form

There are two ways of installing and running the application:

- Locally
- Using `docker-compose`

## Installing and Running the Application Locally

This application has a "client" and a "server."

To install the application, you must install the dependencies for both.

The back-end has been tested with Node versions 14 through 18.

To install the dependencies for the client, go to the "client/" folder and run the command:

```bash
yarn install
```

Then, go to the "server/" folder and run the same command (`yarn install`).

To run the application, you'll need to have a terminal running the client and another terminal running the server.

To run the client, go to the "client/" folder and run the command:

```bash
yarn start
```

To run the server, go to the "server/" folder and run the same command (`yarn start`).

## Installing and Running The Application in Docker

To run the application using `docker` you must have both `docker` and `docker-compose` installed in your system.

To build the containers and run the application, you can simply run the command `docker-compose up` from the root folder of the project (not the "/client" or "/server" folders).

**NOTE: The Docker containers will respond to changes made to the client folder in real-time. If you change the contents of the server folder, these won't be reflected in the Docker containers. However, changing the contents of the server folder is not necessary to complete this assessment.**

When you want to stop the container services, you can just run `docker-compose down`.

### Container Logs

To see the container's logs, you can run the command `docker container logs <container-name>`. The `docker` CLI offers autocomplete, so if you're not sure of the name of the container, you can just write `docker container logs` and then press the TAB key to cycle through the container names.

## Verifying that Everything is Set Up Correctly

When the server is running correctly in your local environment, you will see an output in the terminal where the server is running that looks like this:

```text
❯ yarn start
yarn run v1.22.10
$ nodemon app.js
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
listening on port 8080
```

If you see the text `listening on port 8080`, it means that the server is running successfully.

If you're running the application in a Docker container, you'll likely won't see that output. To verify that the server is running correctly inside of your container, please refer to the "Container Logs" section of this README for instructions on how to inspect the server container output.

To verify that the client is running successfully, visit the URL "[http://localhost:3000](http://localhost:3000/)". You should see an empty form with a blue button that says "Continue", as shown in the picture below:

![](https://storage.googleapis.com/hatchways.appspot.com/employers/assessmentTemplates/StartingForm.png)

# Assessment
![image](https://github.com/Outset-AI/autocomplete-design/assets/112057463/63493b29-c11b-43ed-8336-3130aff6c07c)

In this part of the assessment, you will need to create input fields (street, city, state, postal code, country) and connect the provided handleChange function to the input fields. These inputs should be controlled, and their values should be taken from the provided inputValues state.

Please note that styling is NOT part of the assessment.

When the value of each input field changes, the getAutocompleteData function (already provided) should be automatically triggered. This data should be used to display the autocomplete options for each of the input fields.

For example:

![223530330-bb24634f-f7d2-46f7-a12a-7a10818d1470](https://github.com/Outset-AI/autocomplete-design/assets/112057463/5bc431e5-b03e-4ef2-90fb-da80cab57f83)



Please note that each input field should work like an "autocomplete" input field, displaying the available options for that field, and filtering the options as the user types in the input.

When the user selects one of the options in one field, if there is only a single option available in all other fields, then the remaining fields should auto-populate with the only available option. For example, when a postal code is selected, because there is only one address at the selected postal code, all the remaining fields are auto-populated:

![223530471-df2a718e-16e4-4403-ac44-221290ae15b1](https://github.com/Outset-AI/autocomplete-design/assets/112057463/a2608093-083e-4f73-a5d4-9ee7bf6552f2)


Please note that all the input fields should have data validation, so that an invalid street, city, state, postal code, or country can’t be selected.

![223530306-65843fe5-2693-4151-9f59-4bbc4ffcd3e1](https://github.com/Outset-AI/autocomplete-design/assets/112057463/4597509d-244b-4dc4-ae5b-155274ce14f8)


The list of allowed addresses can be found in the "server/addressData.js" file.

When the "Continue" button is clicked, the handleFormSubmit function (already provided) will be run. This function will send the inputValues to the server.

Please note that CSS styles already applied by default to certain HTML elements to style the application. You don’t need to add any additional CSS.

Additional Considerations:

Please implement a way of reducing the number of API requests that are being made to the back-end when the user types on the input fields.
