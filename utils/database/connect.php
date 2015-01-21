<?php
if(!(isset($_POST['login']) && isset($_POST['password'])))
{
   header('Location: ../../index.html');
}
else
{
    // On va vérifier les variables
    if(!preg_match('/^[[:alnum:]]+$/', $_POST['login']) or !preg_match('/^[[:alnum:]]+$/', $_POST['password']))
    {
        echo 'Vous devez entrer uniquement des lettres ou des chiffres <br/>';
        echo '<a href="../../index.html" temp_href="index.html">Réessayer</a>';
        exit();
    }
    else
    {
        require('config.php'); // On réclame le fichier

        $login = $_POST['login'];
        $password = $_POST['password'];

		require('util.php');
		define("ENCRYPTION_KEY", "=@~#;:&-");
		
		$req = $bdd->prepare('SELECT login,password FROM user WHERE login=:login');
		$req->execute(array('login'=>$login));
		$user = $req->fetch();
		if ($req->rowCount() > 0) {
			//le login existe  header('Location: ../home.html');
			$passwordBD = $user['password'];
			$password = base64_encode(encrypt($password, ENCRYPTION_KEY));
			if($passwordBD==$password){
			//c'est le bon password
			
			setcookie("username", $login, time() + 3600, '/');
			
			echo "Vous êtes connecté";
			header('Location: ../../home.html');
			}
			else{
			//mauvais password
			echo "Erreur de mot de passe, veuillez le retaper";
			header('Location: ../../index.html');
			}
		}
		else{
		//login existe pas
		}
		$req->closeCursor();
		
		
    }
}
?>