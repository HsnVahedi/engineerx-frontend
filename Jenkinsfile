pipeline {
    agent any
    stages {
        stage('Build Frontend Microservice') {
            steps {
                script {
                    withDockerRegistry([ credentialsId: "dockerhub-repo", url: "" ]) {
                        def frontendImage = docker.build("hsndocker/frontend:${env.BUILD_ID}")
                        frontendImage.push()
                    }
                }
            }
        }
        stage('Build Ingress Microservice') {
            steps {
                script {
                    withDockerRegistry([ credentialsId: "dockerhub-repo", url: "" ]) {
                        def frontendImage = docker.build("hsndocker/nginx:${env.BUILD_ID}")
                        frontendImage.push()
                    }
                }
            }
        }
        stage ('Invoke Unittest Pipeline') {
            steps {
                build job: 'engineerx-frontend-unittest', parameters: [
                    string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}")
                ]
            }
        }
    }
}