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
                # 1. Fetch the stable version, following redirects
                echo "Fetching stable kubectl version..."
                KUBECTL_VERSION=$(curl -sSL https://dl.k8s.io/release/stable.txt)
                echo "→ will install kubectl ${KUBECTL_VERSION}"

                # 2. Download the binary, following redirects, into workspace
                curl -sSL -o kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"

                # 3. Make it executable
                chmod +x kubectl

                # 4. Verify it
                echo "kubectl client version:"
                ./kubectl version --client

                #deploy using kubectl
                ./kubectl apply -f deployment.yml
                ./kubectl apply -f service.yml

                '''
            }
        }
    }
}
