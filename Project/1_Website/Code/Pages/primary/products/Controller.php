<?phprequire_once FILE_ACCESS_CORE_CODE.'/Framework/MVC_superClasses_Core/controllerSuperClass_Core/controllerSuperClass_Core.php';require_once('Model.php');require_once('View.php');require_once "Project/1_Website/Code/Applications/Multilingual/Controllers/modules/userSession.php";class controller extends controllerSuperClass_Core{	function indexAction()	{		$url_parameter= routes::getInstance()->getCurrentPageID();		$this->loadXML('data');	}		protected function loadXML($xml_file)	{		$view = new view();		$model  = new model();						$url = $_SERVER['REQUEST_URI'];		$language = explode("/", $url);					if($language[1]== 'cn')			$dataHandler = $model->loadDataSimpleXML($xml_file."-chinese");		else			$dataHandler = $model->loadDataSimpleXML($xml_file);			$view->_XMLObj = $dataHandler;			$view->renderAll();	}	}?>