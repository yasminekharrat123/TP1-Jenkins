pipeline {
    agent any 

    environment {
        IMAGE_NAME = "express-app"
        DOCKER_REGISTRY = "my-registry"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                branch: 'master',
                url: 'https://github.com/yasminekharrat123/TP1-Jenkins.git',
                credentialsId: '29350dd6-046e-4588-b774-7a2fbe1e64a6'
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
