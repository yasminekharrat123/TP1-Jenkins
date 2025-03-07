pipeline {
    agent any 

    environment {
        IMAGE_NAME = "mon-app"
        DOCKER_REGISTRY = "mon-registry"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git branch: 'main', url: 'git@github.com:mon-utilisateur/mon-repo.git'
            }
        }

        stage('Installer les dépendances') {
            steps {
                sh 'npm install'
            }
        }

        stage('Exécuter les tests unitaires') {
            steps {
                sh 'npm test'  // Remplacez par la commande de vos tests
            }
        }

        stage('Construire l’image Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Pousser l’image vers le registre') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker tag $IMAGE_NAME:latest $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                }
            }
        }
    }
}
