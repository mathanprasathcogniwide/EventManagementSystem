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
                    if (env.GIT_BRANCH == 'origin/develop') {
                        echo "Passed the staging, moving to production"
                    } else if (env.GIT_BRANCH == 'origin/main') {
                        echo "Passed the production, ready for live"
                    } 
                }
            }
        }
    }
}
