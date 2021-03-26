pipeline {
    agent any
    parameters {
        string(name: 'CLUSTER_NAME', defaultValue: 'engineerx')
        string(name: 'REGION', defaultValue: 'us-east-2')
    }
    environment {
        REGION = "${params.REGION}"
        CLUSTER_NAME = "${params.CLUSTER_NAME}"
    }
    stages {
        stage('Build Frontend Images') {
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
                        dir('nginx/local') {
                            script {
                                withDockerRegistry([ credentialsId: "dockerhub-repo", url: "" ]) {
                                    def frontendImage = docker.build("hsndocker/local-nginx:${env.BUILD_ID}")
                                    frontendImage.push()
                                }
                            }
                        } 
                    }
                }
            }
        }
        
        stage('Invoke Tests') {
            parallel {
                stage ('Invoke Unittest Pipeline') {
                    steps {
                        build job: 'frontend-test', parameters: [
                            string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}"),
                            string(name: "REGION", value: "${env.REGION}"),
                            string(name: "CLUSTER_NAME", value: "${env.CLUSTER_NAME}")
                        ]
                    }
                }
                stage('Invoke Integration Test Pipeline') {
                    steps {
                        build job: 'integration-test', parameters: [
                            string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}"),
                            string(name: "REGION", value: "${env.REGION}"),
                            string(name: "CLUSTER_NAME", value: "${env.CLUSTER_NAME}")
                        ]
                    }
                }
            }
        }
        stage('Invoke Setting latest tags') {
            steps {
                build job: 'frontend-latest-tag', parameters: [
                    string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}")
                ]
            }
        }
        // stage('Invoke Production Deployment') {
        //     steps {
        //         build job: 'aws-deployment', parameters: [
        //             string(name: "FRONTEND_VERSION", value: "${env.BUILD_ID}"),
        //             string(name: "REGION", value: "${env.REGION}"),
        //             string(name: "CLUSTER_NAME", value: "${env.CLUSTER_NAME}")
        //         ]
        //     }
        // }
    }
}
