const router = express.Router();

const User = require('../models/user.js');

router.get('/', async(req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
        res.render('forms/index.ejs', {
          forms: currentUser.forms,
          });
         
        }catch (error) {
        console.log(error);
    res.redirect('/');
    }
  }); 


router.get('/new', async (req, res) => {
    res.render('forms/new.ejs');
  });


router.post('/', async (req, res) => {
    try {
     const currentUser = await User.findById(req.session.user._id);

      currentUser.forms.push(req.body);

      await currentUser.save()
   
      res.redirect(`/users/${currentUser._id}/forms`);

    } catch (error) {
    
      console.log(error);
      res.redirect('/');
    }
  });
  



router.get('/:formsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const form = currentUser.forms.id(req.params.formId);
   res.render('forms/show.ejs', {
        form:form,
   });
  } catch (error) {
        console.log(error);
    res.redirect('/');
  }
});
router.delete('/:formId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
  
    currentUser.forms.id(req.params.formId).deleteOne();
   
    await currentUser.save();
 
    res.redirect(`/users/${currentUser._id}/forms`);
  } catch (error) {
  
    console.log(error);
    res.redirect('/');
  }
}),




router.get('/:formId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const form = currentUser.forms.id(req.params.formsId);
    res.render('forms/edit.ejs', {
    form:form
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});





router.put('/:formId', async (req, res) => {
  try {
  
    const currentUser = await User.findById(req.session.user._id);
   
    const form = currentUserforms.id(req.params.formId);
   form.set(req.body);
  
    await currentUser.save();
  
    res.redirect(
      `/users/${currentUser._id}/${req.params.formId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


  

  
module.exports = router;
