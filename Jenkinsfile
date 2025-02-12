pipeline {

agent any

stages {

stage('Checkout') {

steps {

checkout scm

}

}

stage('Build') {

steps {

sh 'echo "Building the project..."" // Replace with your actual build command (e.g., mvn clean install, npm run build)

}

}

stage('Test') {

steps {

sh 'echo "Testing the project..."" // Replace with your actual test command (e.g., npm test, mvn test)

}
