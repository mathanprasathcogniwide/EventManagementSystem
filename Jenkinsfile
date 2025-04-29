pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

         stage('commit message'){
                steps{
                    script{
                        def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=%B | cat')
                        if(commitMessage =~ 'staging'){
                            echo "Staging branch detected"
                        } else if(commitMessage =~ 'production'){
                            echo "Production branch detected"
                        }
                    }
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
