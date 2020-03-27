pipeline {
    agent {
      node {
        label 'py-coad'
	  }
    }
    
    options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()              
    }
    
    stages {
	  
      stage('CheckOut') {
        steps {
          checkout scm		
        }
      }
      
      stage('Analise Codigo') {
        when {
          branch 'homolog'
        }
         steps {
           sh 'sonar-scanner \
              -Dsonar.projectKey=SME-Contratos-FrontEnd \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://sonar.sme.prefeitura.sp.gov.br \
              -Dsonar.login=35e9459957e7194c65b18c6281a9e3aa1f86d294'
         }
      }
      
      stage('Deploy Dev') {
        when {
          branch 'development'
        }
        steps {
           sh 'echo Deploying desenvolvimento'
           // Start JOB para build das imagens Docker e push SME Registry
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "6f141697-7892-4376-8db1-72b838528b44",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
                
         //Start JOB para update de deploy Kubernetes 
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "f224fb15-300a-4981-97d1-45c7e9798320",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
      
       
        }
      }
        
      stage('Deploy Homolog') {
        when {
          branch 'homolog'
        }
        steps {
          timeout(time: 24, unit: "HOURS") {
          telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\nBranch name: ${GIT_BRANCH}\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
          input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'ebufaino, marcos_nastri, calvin_rossinhole, kelwy_oliveira'
          }
          sh 'echo Deploying homologacao'
          // Start JOB Rundeck para build das imagens Docker e push SME Registry
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE BUILD
              jobId: "ef2d426b-464c-4a67-be52-1306ccc33d5c",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
                
       //Start JOB para update de imagens no host homologação 
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "2a7d135d-813e-4b09-ac4b-fdd35b7990da",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
      }
      
      stage('Deploy Prod') {
        when {
          branch 'master'
        }
        steps {
          timeout(time: 24, unit: "HOURS") {
          telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\nBranch name: ${GIT_BRANCH}\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
          input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'ebufaino, marcos_nastri, calvin_rossinhole, kelwy_oliveira'
          }
          sh 'echo Deploying homologacao'
          // Start JOB Rundeck para build das imagens Docker e push SME Registry
      
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                             
              //JOB DE BUILD
              jobId: "3cfe0076-3ede-4f84-ac1a-8a645d86832e",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
                
       //Start JOB Rundeck para update de imagens no host homologação 
         
          script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "cec90eb9-4e62-4f23-a370-2d8cf2818d9a",
              nodeFilters: "",
              //options: """
              //     PARAM_1=value1
               //    PARAM_2=value2
              //     PARAM_3=
              //     """,
              rundeckInstance: "Rundeck-SME",
              shouldFailTheBuild: true,
              shouldWaitForRundeckJob: true,
              tags: "",
              tailLog: true])
          }
        }
      }

    }

post {
  always {
    echo 'One way or another, I have finished'
  }
  success {
    telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Esta ok !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n\n Uma nova versão da aplicação esta disponivel!!!")
  }
  unstable {
    telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Esta instavel ...\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
  }
  failure {
    telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME}  - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
  }
  changed {
    echo 'Things were different before...'
  }
  aborted {
    telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
  }
}
}
