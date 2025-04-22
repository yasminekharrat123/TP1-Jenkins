pipeline {
    agent any 

    environment {
        IMAGE_NAME = "test-express-app"
        DOCKER_REGISTRY = "ykharrat848"
    }
    stages {
        stage('Check Docker') {
            steps {
                sh 'docker version'
            }
        }
        stage('Construire l’image Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        // stage('Authentification Docker & Push') {
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        //                 sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
        //                 sh 'docker tag $IMAGE_NAME:latest $DOCKER_REGISTRY/$IMAGE_NAME:latest'
        //                 sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
        //                 sh 'docker logout'
        //             }
        //         }
        //     }
        // }

        stage('Install kubectl') {
            steps {
                sh '''
                # Get latest stable version
                KUBECTL_VERSION=$(curl -s -H "Accept: application/vnd.github.v3+json" https://dl.k8s.io/release/stable.txt)
                
                # Download kubectl binary
                curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
                
                chmod +x kubectl
                
                # Use local version if no sudo
                echo "Using kubectl version:"
                ./kubectl version --client
                '''
            }
        }
        stage('Déployer sur Kubernetes') {
               steps {
                   script {
                       sh 'kubectl apply -f deployment.yml'
                       sh 'kubectl apply -f service.yml'
                   }
               }
           }
    }
}
