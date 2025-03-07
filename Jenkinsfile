pipeline {
    agent any 

    environment {
        IMAGE_NAME = "express-app"
        DOCKER_REGISTRY = "my-registry"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git branch: 'master', url: 'git@github.com:yasminekharrat123/TP1-Jenkins.git'
            }
        }

        stage('Installer les dépendances') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Construire l’image Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Authentification Docker & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                        sh 'docker tag $IMAGE_NAME:latest $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                        sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                        sh 'docker logout'
                    }
                }
            }
        }
    }
}
