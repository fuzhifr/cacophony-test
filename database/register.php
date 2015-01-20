<?php
print_r($_POST['login']);
print_r($_POST['password']);
print_r($_POST['passwordConfirm']);
if(!(isset($_POST['login']) && isset($_POST['password']) && isset($_POST['passwordConfirm']) && ($_POST['password']==$_POST['passwordConfirm'])))
{
    header('Location: ../registrationForm.html');
}
else
{
    // On va vérifier les variables
    if(!preg_match('/^[[:alnum:]]+$/', $_POST['login']) or !preg_match('/^[[:alnum:]]+$/', $_POST['password']) or !preg_match('/^[[:alnum:]]+$/', $_POST['passwordConfirm']))
    {
        echo 'Vous devez entrer uniquement des lettres ou des chiffres <br/>';
        echo '<a href="registrationForm.html" temp_href="registrationForm.html">Réessayer</a>';
        exit();
    }
    else
    {
        require('config.php'); // On réclame le fichier

        $login = $_POST['login'];
        $password = $_POST['password'];

		require('util.php');
		define("ENCRYPTION_KEY", "=@~#;:&-");
		$password = base64_encode(encrypt($password, ENCRYPTION_KEY));
		
		$insert=$bdd->prepare('INSERT INTO user(login,password) VALUES(:login,:password)');
		$insert->execute(array('login'=>$login,'password'=>$password));
		session_start();
		if(!isset($_SESSION['user'])){
			$_SESSION['user']=$login;
		}
		header('Location: ../home.php');
    }
}
?>