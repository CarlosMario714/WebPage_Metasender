export default {
    en: {
        "navbar": {
            "navbar-home": "HOME",
            "navbar-send": "SEND",
            "navbar-palco": "PALCO",
            "navbar-connect": "CONNECT WALLET <img src=\"./img/icons/Metamask-icon.png\"alt=\"icono metamask\">"
        },
        "header": {
            "header-slogan-subtitle": "A Metalorian's DApp"
        },
        "description": {
            "description-title": "Send tokens to multiple accounts at once",
            "description-text": "With <span>The MetaSender</span> you can send tokens to multiple accounts at the same time on networks like Ethereum, Binance, Polygon, among others. At a reduced price.",
            "description-action": "Connect your Wallet <img class=\"metamask-icon\" src=\"./img/icons/Metamask-icon.png\" alt=\"icono metamask\"> choose a network and select one way to do it:",
            "description-send-file": "Send tokens by adding accounts from an Excel file.",
            "description-send-manual": "Send tokens by adding accounts manually."
        },
        "send-process": {
            "send-process-title": "Add accounts",
            "send-process-label-token-type": "Token Type",
            "send-process-label-wallet": "Account or Wallet to send",
            "send-process-span-wallet": "Account or Wallet to send",
            "send-process-label-amount": "Amount to send",
            "send-process-span-amount": "Only positive numbers",
            "send-process-span-field": "Fill in this field",
            "send-process-contract-address": "Contract Address",
            "send-process-span-contract-address": "Invalid contract addres",
            "send-process-correct-data": "Correct data",
            "send-process-incorrect-data": "Incorrect data",
            "span-contract-continue": "Continue",
            "send-process-continue": "Continue",
            "send-process-file-title": "Upload a file",
            "send-process-drop-title": "Drag and drop the file here",
            "send-process-drop-release": "Release to upload file",
            "send-process-file-or": "or",
            "send-process-drop-btnSelect": "Select your files",
            "send-process-template-text": "*The file must comply with the template: ",
            "send-process-template-link": "Download Template",
            "send-process-template-condition1": "*Each data in the file must not contain blank spaces",
            "send-process-template-condition2": "*If you are going to send ERC721, in the amount column you must indicate the ID of the token to send",
            "send-process-template-condition3": "*Maximum 255 transactions per operation",
            "send-process-file-label-tokenType": "Select the Type of Token to Send",
            "send-process-resume-title": "Summary of the operation",
            "send-process-resume-totalwallets": "Total wallets or Address",
            "send-process-resume-totalTokens": "Total tokens to send",
            "send-process-resume-tokenBalance": "Your token balance",
            "send-process-resume-balance": "Your native token Balance",
            "send-process-resume-txCost": "Approximate cost</br>( metasender fee + gas fee )",
            "send-process-resume-txCost-Palco": "Approximate cost</br>( gas fee )",
            "send-process-resume-totalValue": "Estimated Total Value",
            "send-process-resume-bELink": "See Transaction",
            "send-process-aproval-title": "Approval to transfer tokens",
            "send-process-aproval-text": "<span>The MetaSender</span> requires your <span>approval</span> in order to transfer your tokens to the added addresses and to proceed to the next step of the operation:",
            "send-process-aproval-tokens": "Total Tokens to send:",
            "send-process-aprove-btn": "Approve to The MetaSender",
            "send-process-resume-backBtn": "Back",
            "send-process-resume-sendBtn": "Send",
            correct_data_Title: "<h2 data-content=\"send-process\" data-type=\"send-process-correct-data\">Correct data</h2>",
            incorrect_data_Title: "<h2 data-content=\"send-process\" data-type=\"send-process-incorrect-data\">Incorrect data</h2>"
        },
        "palco": {
            "palco-title": "<span>Be part of our</span> Palco",
            "palco-info": "<span>The Metasender</span> will charge you a small tax for each batch of transactions that you make, you can make lots of free transactions for life by becoming part of our <span>Palco</span>",
            "palco-table-title": "The MetaSender fees",
            "palco-normalUser": "Normal user",
            "palco-network": "Network",
            "palco-fees": "Transaction tax",
            "palco-palcoMember": "Palco member*",
            "palco-alert": "*The Palco member will have these benefits only in the network that buys the subscription.",
            "palco-prices-texts": "<span>To be part of our Palco,</span> connect your wallet, choose the network in which you want to be part of the Palco and click on buy.",
            "palco-prices-title": "Palco prices",
            "palco-subscription": "Price Subscription",
            "btn-palco": "Buy <span>Palco</span> Now"
        },
        "tutorial": {
            "tutorial-text": "Look at our tutorial in our documentation so you can see how <span>The MetaSender</span> works:",
            "tutorial-btn": "See <span>Tutorial</span>"
        },
        "incorrectElement": {
            "onlyWalletError": "<div class=\"wallet-errors\"><p><span>Invalid Wallet or Address: </span>Add a valid Address without spaces</p></div>",
            "onlyAmountError": "<div class=\"wallet-errors\"><p><span>Invalid amount:</span> Only positive numbers</p> </div>",
            "allErrors": "<div class=\"wallet-errors\"><p><span>Invalid Wallet or Address:</span> write a valid address without spaces</p> <p><span>Invalid amount:</span> Only positive numbers</p></div>",
            "repitedWallet": `Repeated wallets`,
        },
        "footer": {
            "footer-followus": "Follow Us"
        },
        "alerts": {
            "install-metamask": "The MetaSender will only work <br />on a desktop browser with metamask installed",
            "Not Suported network": "Network Not Supported",
            "batch_max": "Error: maximum 255 per lot",
            "incorrect_file": "Error: file not compatible",
            contract_address: "Error: Incorrect Contract Address",
            incorrect_info: "Error: Fix Incorrect Info"
        },
        "ETH": {
            "labelAdress": "Account or Wallet to send",
            "walletInput": "Write the wallet",
            "labelAmount": "Amount to send",
            "amountInput_placeHolder": "Write the amount",
            "amountInput_pattern": "^\\d*\\.\\d+$|^\\d*\\d+$",
            "amountInput_text": "only positive numbers"
        },
        "ERC20": {
            "labelAdress": "Account or Wallet to send",
            "walletInput": "Write the wallet",
            "labelAmount": "Amount of tokens to send",
            "amountInput_placeHolder": "Write amount of tokens",
            "amountInput_pattern": "^\\d*\\.\\d+$|^\\d*\\d+$",
            "amountInput_text": "only positive numbers"
        },
        "ERC721": {
            "labelAdress": "Account or Wallet to send",
            "walletInput": "Write the wallet",
            "labelAmount": "ID of the token to send",
            "amountInput_placeHolder": "Write the ID of the token",
            "amountInput_pattern": "^\\d*\\d+$",
            "amountInput_text": "only positive integers"
        },
    },
    es: {
        "navbar": {
            "navbar-home": "INICIO",
            "navbar-send": "ENVIAR",
            "navbar-palco": "PALCO",
            "navbar-connect": "CONECTAR WALLET <img src=\"./img/icons/Metamask-icon.png\"alt=\"icono metamask\">"
        },
        "header": {
            "header-slogan-subtitle": "Una DApp de The Metalorian"
        },
        "description": {
            "description-title": "Envía tokens a varias cuentas a la vez",
            "description-text": "Con <span>The MetaSender</span> puedes enviar tokens a múltiples cuentas al mismo tiempo en redes como Ethereum, Binance, Polygon, entre otras. A precio reducido.",
            "description-action": "Conecta tu Wallet <img class=\"metamask-icon\" src=\"./img/icons/Metamask-icon.png\" alt=\"icono metamask\"> escoje una red y selecciona una forma de realizar el proceso:",
            "description-send-file": "Envíe tokens agregando cuentas desde un archivo de Excel.",
            "description-send-manual": "Envíe tokens agregando cuentas manualmente."
        },
        "send-process": {
            "send-process-title": "Agregar cuentas",
            "send-process-label-token-type": "Tipo de Token",
            "send-process-label-wallet": "Cuenta o Wallet para enviar",
            "send-process-span-wallet": "Cuenta o Wallet para enviar",
            "send-process-label-amount": "cantidad a enviar",
            "send-process-span-amount": "Solo numeros positivos",
            "send-process-span-field": "Completa este campo",
            "send-process-contract-address": "Dirección del contrato",
            "send-process-span-contract-address": "Dirección de contrato no válida",
            "send-process-correct-data": "Datos correctos",
            "send-process-incorrect-data": "Datos Incorrectos",
            "span-contract-continue": "Continuar",
            "send-process-continue": "Continuar",
            "send-process-file-title": "Cargar un archivo",
            "send-process-drop-title": "Arrastra y suelta el archivo aquí",
            "send-process-drop-release": "Suelta el archivo para cargarlo",
            "send-process-file-or": "O",
            "send-process-drop-btnSelect": "Seleccione sus archivos",
            "send-process-template-text": "*El archivo debe cumplir con la plantilla: ",
            "send-process-template-link": "Descargar plantilla",
            "send-process-template-condition1": "*Ningun dato en el archivo debe contener espacios en blanco",
            "send-process-template-condition2": "*Si vas a enviar ERC721, en la columna de mount debes indicar el ID del token a enviar",
            "send-process-template-condition3": "*Maximo 255 transacciones por lote",
            "send-process-file-label-tokenType": "Seleccione el tipo de token para enviar",
            "send-process-resume-title": "Resumen de la operación",
            "send-process-resume-totalwallets": "Total de wallets",
            "send-process-resume-totalTokens": "Tokens totales para enviar",
            "send-process-resume-tokenBalance": "Su Saldo en tokens",
            "send-process-resume-balance": "Su saldo de token nativo",
            "send-process-resume-txCost": "Costo aproximado</br>( metasender fee + gas fee )",
            "send-process-resume-txCost-Palco": "Costo aproximado</br>( gas fee )",
            "send-process-resume-totalValue": "Valor total estimado",
            "send-process-resume-bELink": "Ver transacción",
            "send-process-aproval-title": "Aprobación para transferir tokens",
            "send-process-aproval-text": "<span>The MetaSender</span> requiere su <span>aprobación</span> para transferir sus tokens a las direcciones agregadas y continuar con el siguiente paso de la operación:",
            "send-process-aproval-tokens": "Tokens totales a enviar:",
            "send-process-aprove-btn": "Aprovar a The MetaSender",
            "send-process-resume-backBtn": "Atras",
            "send-process-resume-sendBtn": "Enviar",
            correct_data_Title: "<h2 data-content=\"send-process\" data-type=\"send-process-correct-data\">Datos correctos</h2>",
            incorrect_data_Title: "<h2 data-content=\"send-process\" data-type=\"send-process-incorrect-data\">Datos Incorrectos</h2>"
        },
        "palco": {
            "palco-title": "<span>Sé parte de nuestro</span> Palco",
            "palco-info": "<span>El Metasender</span> te cobrará un pequeño impuesto por cada lote de transacciones que realices, puedes realizar muchas transacciones gratis de por vida siendo parte de nuestro <span>Palco</span>",
            "palco-table-title": "Tarifas de The MetaSender",
            "palco-normalUser": "Usuario normal",
            "palco-network": "Red",
            "palco-fees": "Tarifa por transaccion",
            "palco-palcoMember": "Miembro del Palco*",
            "palco-alert": "*El miembro del Palco tendrá estos beneficios solo en la red que compre la suscripción.",
            "palco-prices-texts": "<span>Para se parte de nuestro Palco,</span> conecta tu wallet, elige la red en la que quieres formar parte de la Palco y haz clic en comprar.",
            "palco-prices-title": "Precios del Palco",
            "palco-subscription": "Precio de suscripción",
            "btn-palco": "Comprar <span>Palco</span>"
        },
        "tutorial": {
            "tutorial-text": "Mire nuestro tutorial en nuestra documentación para que pueda ver cómo funciona <span>The MetaSender</span>:",
            "tutorial-btn": "Ver <span>Tutorial</span>"
        },
        "incorrectElement": {
            "onlyWalletError": "<div class=\"wallet-errors\"><p><span>Wallet no válida: </span>Agregue una dirección válida sin espacios</p></div>",
            "onlyAmountError": "<div class=\"wallet-errors\"><p><span>Monto no valido:</span> Solo números positivos</p> </div>",
            "allErrors": "<div class=\"wallet-errors\"><p><span>Wallet no válida:</span> escriba una dirección válida sin espacios</p> <p><span>Monto no valido:</span> Solo numeros positivos</p></div>",
            "repitedWallet": `<p class="repeated-wallet">Wallet Repetida</p>`,
        },
        "footer": {
            "footer-followus": "Síguenos"
        },
        "alerts": {
            "install-metamask": "The MetaSender solo funciona en un navegardor<br />  de escritorio con Metamask instalado",
            "Not Suported network": "Red no compatible",
            "batch_max": "Error: maximo 255 por lote",
            "incorrect_file": "Error: archivo no compatible",
            contract_address: "Error: Direccion de contrato incorrecta",
            incorrect_info: "Error: Corrija información incorrecta"
        },
        "ETH": {
            "labelAdress": "Wallet para enviar",
            "walletInput": "Escribe la wallet",
            "labelAmount": "Cantidad a enviar",
            "amountInput_placeHolder": "Cantidad a enviar",
            "amountInput_pattern": "^\\d*\\.\\d+$|^\\d*\\d+$",
            "amountInput_text": "Solo numeros positivos"
        },
        "ERC20": {
            "labelAdress": "Wallet para enviar",
            "walletInput": "Escribe la wallet",
            "labelAmount": "Cantidad de tokens a enviar",
            "amountInput_placeHolder": "Escribe la cantidad de tokens",
            "amountInput_pattern": "^\\d*\\.\\d+$|^\\d*\\d+$",
            "amountInput_text": "solo numeros positivos"
        },
        "ERC721": {
            "labelAdress": "Wallet para enviar",
            "walletInput": "Escribe la wallet",
            "labelAmount": "ID del token a enviar",
            "amountInput_placeHolder": "Escribe el ID del token",
            "amountInput_pattern": "^\\d*\\d+$",
            "amountInput_text": "Solo enteros positivos"
        },
    }
}
