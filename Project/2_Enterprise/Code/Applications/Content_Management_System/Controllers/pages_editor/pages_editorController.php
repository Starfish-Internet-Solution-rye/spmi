<?php
require_once 'Project/ApplicationsFramework/MVC_superClasses/applicationsSuperController.php';
require_once 'pages_editorModel.php';
require_once 'pages_editorView.php';
require_once 'Project/2_Enterprise/Code/Applications/Content_Management_System/Modules/userSession.php';
//----------------------------------------------------------
class pages_editorController extends applicationsSuperController
{
	public function __construct()
	{
		parent::__construct();
		
		require_once 'Project/2_Enterprise/Code/Applications/Photo_Library/Controllers/images/imagesView.php';
		$images = new imagesView();
		$images->getPhotoChooser();
	}
	
	public function indexAction()
	{
		$pages_editorModel = new pages_editorModel();
		
		
		$dataHandler = new dataHandler();
		$pagesXML = $dataHandler->loadDataSimpleXML('Project/'.PRIMARY_DOMAIN.'/Code/Pages/pages_navigation.xml');

		if(isset($_POST['language']) && $_POST['language'] == 'chinese')
			$pages_editorModel->setLangauge('chinese');
			
			$pageXML = $pages_editorModel->getPageXML($pagesXML);

		if (isset($_POST['save'])) 
		{
			$domObj = $pages_editorModel->updateDOMObjectWithPOST($pageXML,1);
			$xmlObj = simplexml_import_dom($domObj);
			$fileNameOfPageXML = $pages_editorModel->getFileNameOfPageXML();
			
			if($_POST['save'] == 'chinese')
			{
				$exploded = explode('/', $fileNameOfPageXML);
				$lastoffset =  count($exploded) - 1;
				$filename = str_replace('.', '-chinese.', $exploded[$lastoffset]);
				$exploded[$lastoffset] = $filename;
				$fileNameOfPageXML = implode('/', $exploded);
			}
			
			$dataHandler->saveDataXML($fileNameOfPageXML,$xmlObj);
		}
		
		$pages_editor_View = new pages_editor_View();
		$pages_editor_View->displayPageEditor($pageXML);
		
	}
	
	public function changeLanguageEnterpriseAction()
	{
		$language = $this->getValueOfURLParameterPair('language');
		$location = $_GET['location'];
		
		userSession::saveUserSession($language);
		header("Location: $location");
	}
	
	//================================================================================================================================================
}