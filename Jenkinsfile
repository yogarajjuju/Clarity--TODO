// This is the Jenkinsfile for your Clarity--TODO project

pipeline {
    // 1. Define the "Agent" (the worker machine)
    // We're telling Jenkins to use a Docker container that already has Bun.
    // This is much cleaner than installing Bun on your own machine.
    agent {
        docker { 
            image 'oven/bun:latest' 
        }
    }

    // 2. Define the "Stages" (the steps of the pipeline)
    stages {

        // Stage 1: Checkout Code (This is automatic in SCM pipelines)

        // Stage 2: Install Dependencies
        stage('Install Dependencies') {
            steps {
                // 'sh' runs a shell command inside the Docker container
                echo 'Installing dependencies...'
                sh 'bun install --frozen-lockfile'
            }
        }

        // Stage 3: Build Project
        stage('Build Project') {
            steps {
                echo 'Building project...'
                sh 'bun run build'
            }
        }

        // Stage 4: Archive Artifacts
        stage('Archive') {
            steps {
                echo 'Saving the "dist" folder...'
                // This saves the 'dist' folder as a "build artifact" in the Jenkins dashboard
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }
}
