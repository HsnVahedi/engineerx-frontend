pipeline {
    agent any
    stages {
        stage('Build Backend Images') {
            parallel {
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
                        dir('nginx') {
                            script {
                                withDockerRegistry([ credentialsId: "dockerhub-repo", url: "" ]) {
                                    def frontendImage = docker.build("hsndocker/nginx:${env.BUILD_ID}")
                                    frontendImage.push()
                                }
                            }
                        }
                
                    }
                }
            }
        }
        
        stage ('Invoke Unittest Pipeline') {
            steps {
                build job: 'frontend-test', parameters: [
                    string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}")
                ]
            }
        }
        stage('Invoke Integration Test Pipeline') {
            steps {
                build job: 'integration-test', parameters: [
                    string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}")
                ]
            }
        }
        stage('Invoke Setting latest tags') {
            steps {
                build job: 'frontend-latest-tag', parameters: [
                    string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}")
                ]
            }
        }
    }
}
