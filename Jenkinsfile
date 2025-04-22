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

        stage('Install & Deploy with Debug') {
  steps {
    script {
      // 1. Install kubectl
      sh '''
        echo "Fetching kubectl..."
        KUBECTL_VERSION=$(curl -sSL https://dl.k8s.io/release/stable.txt)
        curl -sSL -o kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
        chmod +x kubectl
      '''

      // 2. Bind kubeconfig and inspect it
      withCredentials([file(credentialsId: 'kubeconfig-cred', variable: 'KUBECONFIG')]) {
        sh '''
          echo "KUBECONFIG is at: $KUBECONFIG"
          ls -la $KUBECONFIG           # Verify the file exists
          echo "---- kubeconfig contents ----"
          sed -e 's/^/| /' $KUBECONFIG  # Safely print it with a prefix
          echo "---- end contents ----"

          echo "kubectl sees these contexts:"
          ./kubectl config view --minify

          echo "Applying deployment.yml…"
          ./kubectl apply -f deployment.yml --validate=false
        '''
      }
    }
  }
}


    }
}
