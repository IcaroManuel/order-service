pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "order-service-app"
        ORDERS_API_KEY = "my-secret-key-123"
        }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Unloading repository code...'
                checkout scm
            }
        }
        }

    stage('Install Dependencies') {
            steps {
                echo '📦 Install depedencies Node.js...'
                sh 'npm install'
            }
        }

    stage('Unit Tests') {
            steps {
                echo '🧪 Run test unit with Jest...'
                sh 'npm run test'
            }
        }

    stage('Docker Build') {
            steps {
                echo '🐳 Building Docker image prod...'
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
                sh "docker tag ${DOCKER_IMAGE}:${env.BUILD_ID} ${DOCKER_IMAGE}:latest"
            }
        }
    }

post {
        always {
            echo '🏁 Cleaning dir...'
            deleteDir()
        }
        success {
            echo '✅ Pipeline successfully completed! Image ready.'
        }
        failure {
            echo '❌ It happened a error in pipline. verify tests logs!'
        }
    }