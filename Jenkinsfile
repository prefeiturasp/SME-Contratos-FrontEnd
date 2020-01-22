//
// Criado para: Secretaria Municipal de Educação - SME
// Data: 22/01/2019
// Projeto: SAFI
// Empresa: AMcom Sistemas
// Mantenedor: Eduardo Bufaino
// E-mail: eduardo.bufaino@amcom.com.br
// E-mail: eduardo.bufaino@gmail.com
//


pipeline {
    agent {
      node {
        //utiliza container PY para job  
        label 'dockernodes8x'
              
      }
    }
	
	options {
      buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
      disableConcurrentBuilds()
      skipDefaultCheckout()	  
    }
    
    stage('CheckOut') {
        steps {
          checkout scm		
        }
      }
      
      stage('Analise codigo') {
	  when {
                branch 'homolog'
          }
            steps {
                sh "echo Executando jshint para anlise do codigo"
                sh 'npm install -g jshint'
                sh 'jshint --verbose --reporter=checkstyle src > checkstyle-jshint.xml || exit 0'
                checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: '**/checkstyle-jshint.xml', unHealthy: ''
                sh 'sonar-scanner \
                -Dsonar.projectKey=SME-Contratos-FrontEnd \
                -Dsonar.sources=src \
                -Dsonar.host.url=http://automation.educacao.intranet:9000 \
                -Dsonar.login=b99426da4100286252d33e258185bc803661c3ca'
            }
        }
      
      // JOB para build das imagens Docker e push ao Registry SME
      stage('Deploy DEV') {
	  when {
                branch 'develop'
            }
        steps {
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
		   
		   // Start JOB para deploy da aplicação em DEV
		   
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
	  
	  stage('Deploy HOM') {
            when {
                branch 'homolog'
            }
            steps {
                 timeout(time: 24, unit: "HOURS") {
               
                 telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
                 input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'ebufaino, alessandro_fernandes'
            }
                 sh 'echo Deploying homologacao'
                
        // Start JOB para build das imagens Docker e push registry SME
      
          script {
           step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                
               
              //JOB DE BUILD
              jobId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
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
                
       //Start JOB para deploy de homologação 
         
         script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "xxxxxxxxxxxxxxxxxxxxxxx",
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
		
		
		stage('Deploy PROD') {
            when {
                branch 'master'
            }
            steps {
                 timeout(time: 24, unit: "HOURS") {
               
                 telegramSend("${JOB_NAME}...O Build ${BUILD_DISPLAY_NAME} - Requer uma aprovação para deploy !!!\n Consulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)\n")
                 input message: 'Deseja realizar o deploy?', ok: 'SIM', submitter: 'ebufaino, alessandro_fernandes'
            }
                 sh 'echo Deploying homologacao'
                
        // Start JOB para build das imagens Docker e push registry SME
      
          script {
           step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
                
               
              //JOB DE BUILD
              jobId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
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
                
       //Start JOB para deploy em Produção 
         
         script {
            step([$class: "RundeckNotifier",
              includeRundeckLogs: true,
              jobId: "xxxxxxxxxxxxxxxxxxxxxxx",
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
            
             telegramSend("O Build ${BUILD_DISPLAY_NAME} <${env.BUILD_URL}> - Quebrou. \nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
        }
        changed {
             
               echo 'Things were different before...'
            
        }
       aborted {
             
             telegramSend("O Build ${BUILD_DISPLAY_NAME} - Foi abortado.\nConsulte o log para detalhes -> [Job logs](${env.BUILD_URL}console)")
        }
    }
}
