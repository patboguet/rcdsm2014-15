
$(document).ready(function() {
//$(document).bind('mobileinit', function(){	
	var datas=[];
	chargementLocal();
	refreshCategory();
	/**
	* recupere la liste des clés de toutes les notes
	* ou si id_category est spécifiés seulement les notes de celle-ci
	*/
	function loadListOfNoteKey(id_category) //ok
	{
		console.log('loadListOfNoteKey('+id_category+')');
		var listKey=id_category==null?'all':'cat-'+id_category+'-';
	
		var list=localStorage.getItem(listKey+'Notes');
		if(list==null) { return []; }
		else
		{
			return JSON.parse(list);
		}		
	}
	
	/**
	* à partir d'un cle renvoi un objet Note (ou false si inexistant)
	*/
	function chargementNoteLocal(key)
	{
		return chargeLocal(key)
	}
	
	
	function chargeCategoryLocal(key)
	{
		return chargeLocal(key)
	}
	function chargeLocal(key)
	{
		console.log('chargeLocal('+key+')');
		var note=localStorage.getItem(key);
		if(note==null) { return false; }
		else
		{
			return JSON.parse(note);
		}	
	}
	
	
	
	/**
	* recharge les données locales
	*/
	function chargementLocal(id_category)
	{
		//parcours du tableau
		$('#notes').html('');
		
		console.log('chargementLocal('+id_category+')');
		var list=loadListOfNoteKey(id_category);
		
		for(var i=0 ; list!=null && i<list.length ; i++)
		{
			var note=chargementNoteLocal(list[i]);
			datas.push(note);
			$('#notes').append(afficheNoteDansListe(note));
			
		}
	}
	
	function ajouteNote(note)
    {
		if(window.localStorage)
		{
			var list=loadListOfNoteKey();
			var listCategory=loadListOfNoteKey(note.id_category);
			var newKey='note-'+localStorage.length;
			list.push(newKey);
			listCategory.push(newKey);
			localStorage.setItem('allNotes', JSON.stringify(list));
			localStorage.setItem('cat-'+note.id_category+'-Notes', JSON.stringify(listCategory));
			
			note.key=newKey;
			
			localStorage.setItem(newKey,JSON.stringify(note));
			
			$('#notes').append(afficheNoteDansListe(note));
			
		}
		else
		{
			alert('Votre navigateur n\'est pas compatible avec le stockage local via localstorage');
		}
		
		
		
	}
	
	function loadListOfcategoryKey()
	{
		var listCategory=localStorage.getItem('Categories');
		if(listCategory==null) { return []; }
		else
		{
			return JSON.parse(listCategory);
		}
	}
	
	
	function chargeCategoryParId(id_category)
	{
		var listCategory=loadListOfcategoryKey();
		
		for(var i=0 ; i<listCategory.length ; i++)
		{
			var category=chargeCategoryLocal(listCategory[i]);
			if(category!=false && category.id_category==id_category) //trouve!
			{
				return category;
			}
		}
		return false; //introuvable		
	}
	
	function ajouteCategory(name)
	{
		var newCategory={
			id_category:localStorage.length,
			name:name
		};
		var newKey='cat-'+localStorage.length;
		
		var list=loadListOfcategoryKey();
		list.push(newKey);
		localStorage.setItem('Categories', JSON.stringify(list));
		localStorage.setItem(newKey,JSON.stringify(newCategory));
		
		
		refreshCategory();
	}
	
	function refreshCategory()
	{
		$('#category').children().remove()
		
		var listCategory=loadListOfcategoryKey();
		
		for(var i=0 ; i<listCategory.length ; i++)
		{
			var category=chargeCategoryLocal(listCategory[i]);
			$('#category').append('<option value="'+category.id_category+'">'+category.name+'</option>');
		}
		
	}
	
	function afficheNoteDansListe(note)
	{
		var category=chargeCategoryParId(note.id_category);
		if(category==false)
		{
			category={id_category:note.id_category,name:'-'};
		}
		return '<li class="note" data-key="'+note.key+'" style="color:'+note.color+'">'+note.comment.replace('\n','<br />')+'<br />Catégorie : '+category.name+'</li>';
	}
	
	console.log('EVENT REGISTERING');
	
	$('#newCategory').click(function(e){
		e.preventDefault();
		if($('#category_name').val().trim()=='')
		{
			alert('Veuillez saisir un contenu');
		}
		else
		{
			ajouteCategory($('#category_name').val());
		}
	});
	
	$('#save').click(function(e){
		e.preventDefault(); //evite le comportement par defaut au clic, pas de soumission du formulaire en http
		if($('#comment').val().trim()=='')
		{
			alert('Veuillez saisir un contenu');
		}
		else
		{
			var newNote={
					id_owner : 2,
					comment : $('#comment').val(),
					creation_date : Math.round(Date.now()/1000),
					id_category : $('#category').val(),
					color : $('#color').val(),
					is_public : true,
					closed : true
				};
			datas.push(
				newNote
			);
			
			
			var note=chargementNoteLocal($('#key').val());
			if(note===false) //la note nexiste pas, donc creation
			{			
				ajouteNote(newNote);
			}
			else //sinon mise à jour
			{
				updateNote(note,newNote);
			}
		}
	
	});
	
	function updateNote(oldNote,newNote)
	{
		if(oldNote.id_category!=newNote.id_category) //on a changer la categorie
		{
			removeNoteFromCategory(oldNote.id_category,oldNote.key);
			addNoteToCategory(newNote.id_category,oldNote.key)
		}
		
		newNote.key=oldNote.key;
		localStorage.setItem(oldNote.key, JSON.stringify(newNote));
		
		chargementLocal();		
	}
	
	/**
	* retire une note d'une categorie
	*/	
	function removeNoteFromCategory(id_category,key)
	{
		var oldList=loadListOfNoteKey(id_category);
		var newList=[];
		for(var i=0 ; oldList!=false && i<oldList.length ; i++)
		{
			if(oldList[i]!=key) { newList.push(oldList[i]); }
		}
		
		localStorage.setItem('cat-'+id_category+'-Notes', JSON.stringify(newList));
	}
	
	/**
	* ajoute une note à une categorie
	*/	
	function addNoteToCategory(id_category,key)
	{
		var newList=loadListOfNoteKey(id_category);
		newList.push(key);
		localStorage.setItem('cat-'+id_category+'-Notes', JSON.stringify(newList));
	}
	
	
	
	/**
	* mets en place la gestion du clic sur toutes les notes (futures compris)
	*/
	$('ul').delegate('li.note','click',function(e){
		console.log('click sur '+$(this).data('key'));
		reediteNote($(this).data('key'));
	});
	
	
	/**
	* recharge une note adns le formulaire
	*/
	function reediteNote(key)
	{
		var note=chargementNoteLocal(key);
		
		if(note!==false)
		{
			$('#key').val(note.key);
			$('#comment').val(note.comment);
			$('#category').val(note.id_category);
			$('#color').val(note.color);
		}
	}
	
	
	
	

	
	
	
	
});