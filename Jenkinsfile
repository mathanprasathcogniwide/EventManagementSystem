pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('branch identification') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'develop') {
                        echo "Passed the staging, moving to production"
                    } else if (env.GIT_BRANCH == 'main') {
                        echo "Passed the production, ready for live"
                    } 
                }
            }
        }
    }
}
