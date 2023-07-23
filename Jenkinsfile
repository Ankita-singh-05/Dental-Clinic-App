pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Ankita-singh-05/Dental-Clinic-App.git'
            }
        }
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                sh 'npm install'
                // Add commands to compile TypeScript, if applicable
            }
        }
    }
}
