<?phprequire_once FILE_ACCESS_CORE_CODE.'/Framework/MVC_superClasses_Core/controllerSuperClass_Core/controllerSuperClass_Core.php';require_once('Model.php');require_once('View.php');require_once "Project/1_Website/Code/Applications/Multilingual/Controllers/modules/userSession.php";
class controller extends controllerSuperClass_Core
{	public function indexAction()	{		$view = new view();		$model  = new model();					$url = $_SERVER['REQUEST_URI'];		$language = explode("/", $url);				if($language[1] == 'cn')			$dataHandler = $model->loadDataSimpleXML('data-chinese');		else			$dataHandler = $model->loadDataSimpleXML('data');				$view->_XMLObj = $dataHandler;						$view->renderAll();	}}?>