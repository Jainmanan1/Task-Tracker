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
                bat 'echo Building the project...'
            }
        }

        stage('Test') {
            steps {
                bat 'echo Testing the project...'
            }
        }
    }
}
