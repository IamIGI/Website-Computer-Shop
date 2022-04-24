//jshint esversion:6

//------------------IMPORT----------------------
const express = require('express');
const bodyPareser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

//------------------IMPORT JS files-------------
const secrets = require('./secrets');

//------------------GLOBAL VARABLES----------------------
const home = 'Home'; const account = 'Account'; const basket = 'Basket';
const about = 'About'; const help = 'Help'; const product = 'Product';
const productsCategory = 'Products Category'; const trends = 'Trends';
const wishList = 'wishList';  const contact = 'Contact';

//Keys for products database
productKeys = ['name', 'price', 'special_offer', 'quantity', 'brand', 'description', 'images', 'specification'];
specialOfferKeys = ['mode', 'price'];
specificationKeys = ['processor', 'ram', 'disk', 'optical_drive', 'screen_diagonal','resolution', 'graphics_card', 'communication', 'ports', 'battery_capacity', 'color', 'operating system', 'additional_information', 'height', 'width', 'depth', 'weigth', 'supplied_accessories', 'guarantees', 'producent_code','Xigi_code'];
processorKeys = ['description','brand','series','generation','cores','min_core_speed','max_core_speed','cache'];
keysDescription = ['description'];

//------------------GLOBAL FUNCTIONS----------------------

function iterateObject(obj, array) {
  // var dict ={};
  for(prop in obj){
    if (typeof(obj[prop]) == 'object'){
      iterateObject(obj[prop], array)
    } else {
      if(array.includes(prop)){
        // console.log(prop.toUpperCase() + ': ', obj[prop]);

        // dict[prop] = obj[prop];
      }
    }
  }
  // console.log(dict);
}

//------------------SERVER CONFIG----------------------
const app = express();
app.set('view engine', 'ejs');
app.use(bodyPareser.urlencoded({
  extended:true
}));
app.use(express.static('public'));
LAN_PORT=4000;

//------------------DATABASE CONFIG----------------------

mongoose.connect(secrets.mongoDB_connect)
//------------------SCHEMAS----------------------
//------ImageElementSchema
const ImageElementSchema = new mongoose.Schema({
  url:{
    type:String,
    required:[true, 'missing image url value']
  }
})
//--------GuaranteesSchemaSchema schema
const GuaranteesSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.guarantees.description values']
  },
  duration:{
    type: Number,
    required: [true, 'missing Specification.guarantees.number values']
  }
});
//--------AdditionalInformationSchema schema
const AdditionalInformationSchema = new mongoose.Schema({
  information:{
    type: String,
    required: [true, 'missing Specification.additional_information.information values']
  }
});
//--------BatteryCapacitySchema schema
const BatteryCapacitySchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.BatteryCapacity.description values']
  },
  capacity:{
    type: Number,
    required: [true, 'missing Specification.BatteryCapacity.capacity values']
  }
});
//--------Communication schema
const CommunicationSchema = new mongoose.Schema({
  com:{
    type: String,
    required: [true, 'missing Specification.CommunicationSchema.com values']
  }
});
//--------Port schema
const PortsSchema = new mongoose.Schema({
  port:{
    type: String,
    required: [true, 'missing Specification.port values']
  }
});
//--------graphic card schema
const GraphicCardSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.graphic_card.description value']
  },
  memory_size:{
    type: Number,
    required: [true, 'missing Specification.graphic_card.memory_size value']
  },
  brand:{
    type: String,
    required: [true, 'missing  Specification.graphic_card.brand value']
  }
});
//--------resolution schema
const ResolutionSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.ram.description value']
  },
  width:{
    type: Number,
    required: [true, 'missing Specification.ram.width value']
  },
  height:{
    type: Number,
    required: [true, 'missing Specification.ram.height value']
  }
});
//--------RamSchema schema
const RamSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.ram.description value']
  },
  size:{
    type: Number,
    required: [true, 'missing Specification.ram.size value']
  },
  type:{
    type: Number,
    required: [true, 'missing Specification.ram.type value']
  },
  speed:{
    type: Number,
    required: [true, 'missing Specification.ram.speed value']
  }
});
//--------DiskSchema schema
const DiskSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.ram.description value']
  },
  size:{
    type: Number,
    required: [true, 'missing Specification.ram.size value']
  },
  type:{
    type: String,
    required: [true, 'missing Specification.ram.type value']
  },
  speed:{
    type: Number,
    required: [true, 'missing Specification.ram.speed value']
  }

});
//-------Rabats for product (embeded document)
const SpecialOfferSchema =  new mongoose.Schema({
  mode:{
    type: Boolean,
    required: [true, 'missing specialOffer.mode value']
  },
  price:{
    type: Number,
    required: [true, 'missing specialOffer.price value']
  }
})
//------Content of descriptionElement(EMBEDED ARRAy i array)
const ContentDescriptionElementSchema = new mongoose.Schema({
  p:{
    type: String,
    required: [true, 'missing Description.Content.p value']
  }
})
//-------DescriptioElementSchema (embeded array of documents)
const DescriptionElementSchema = new mongoose.Schema({
    image:{
      type: String,
      required: false
    },
    title:{
      type: String,
      required: [true, 'missing Description.title value']
    },
    content:[ContentDescriptionElementSchema]
});
//--------ProcessorSchema
const ProcessorSchema = new mongoose.Schema({
  description:{
    type: String,
    required: [true, 'missing Specification.Processor.description value']
  },
  brand:{
    type: String,
    required: [true, 'missing Specification.Processor.brand value']
  },
  series:{
    type: String,
    required: [true, 'missing Specification.Processor.series value']
  },
  generation:{
    type: Number,
    required: [true, 'missing Specification.Processor.generation value'],
    min: 1
  },
  cores:{
    type: Number,
    required: [true, 'missing Specification.Processor.cores value'],
    min: 1
  },
  min_core_speed:{
    type: Number,
    required: [true, 'missing Specification.Processor.min_core_speed value'],
    min: 1
  },
  max_core_speed:{
    type: Number,
    required: [true, 'missing Specification.Processor.max_core_speed value'],
    min: 1
  },
  cache:{
    type: Number,
    required: [true, 'missing Specification.Processor.cache value'],
    min: 1
  }
});
//--------SpecificationSchema
const SpecificationSchema = new mongoose.Schema({
  processor:{
    type: ProcessorSchema,
    required: [true, 'missing Specification.Processor values']
  },
  ram:{
    type: RamSchema,
    required: [true, 'missing Specification.ram values']
  },
  disk:{
    type: DiskSchema,
    required: [true, 'missing Specification.disk values']
  },
  optical_drive:{
    type: Boolean,
    required: [true, 'missing Specification.optical_drive values']
  },
  screen_diagonal:{
    type: Number,
    required: [true, 'missing Specification.screen_diagonal values']
  },
  resolution:{
    type: ResolutionSchema,
    required: [true, 'missing Specification.resolution values']
  },
  graphic_card:{
    type: GraphicCardSchema,
    required: [true, 'missing Specification.graphic_card values']
  },
  communication: [CommunicationSchema],
  ports: [PortsSchema],
  battery_capacity:{
    type: BatteryCapacitySchema,
    required: [true, 'missing Specification.battery_cappacity values']
  },
  color: {
    type: String,
    required: [true, 'missing Specification.color values']
  },
  operating_system: {
    type: String,
    required: [true, 'missing Specification.operating_system values']
  },
  additional_information:[AdditionalInformationSchema],
  height :{
    type: Number,
    required: [true, 'missing Specification.height values']
  },
  width :{
    type: Number,
    required: [true, 'missing Specification.width values']
  },
  depth :{
    type: Number,
    required: [true, 'missing Specification.depth values']
  },
  weight :{
    type: Number,
    required: [true, 'missing Specification.weight values']
  },
  supplied_accessories:{
    type: String,
    required: [true, 'missing Specification.supplied_accessories values']
  },
  guarantees: {
    type: GuaranteesSchema,
    required: [true, 'missing Specification.guarantees values']
  },
  producent_code:{
    type: String,
    required: [true, 'missing Specification.producent_code values']
  },
  Xigi_code:{
    type: String,
    required: [true, 'missing Specification.Xigi_code values']
  }

});
//--------ProductsSchema
const ProductsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'missing name value']
  },
  price:{
    type:Number,
    required: [true, 'missing price value']
  },
  special_offer:{
    type: SpecialOfferSchema,
    required: [true, 'missing special_offer value']
  },
  quantity:{
    type: Number,
    required: [true, 'missing quantity value']
  },
  brand:{
    type: String,
    required: [true, 'missing brand value']
  },
  description:[DescriptionElementSchema],
  image: [ImageElementSchema],
  specification:{
    type: SpecificationSchema
  }
}, {collection: 'products'});

//-------Models
const Product = mongoose.model('Products', ProductsSchema);
//-------Init items
//------------------WEBSITES CONFIG----------------------
//-------HOME
app.get("/", function(req, res){
  console.log('Website: ' + home);
  let productId= '625756527b879ad87ea02bda' //MSI
  Product.find({_id: productId}, function(err, docs){
    if(err){
      console.log('Error in db search: \n'+ err);
    }else{

      // console.log(typeof(JSON.stringify(docs)));
      // console.log(JSON.stringify(docs) );
      data = docs[0].toJSON();

      iterateObject(data, keysDescription);

      // console.log(typeof(docs));
      // console.log( JSON.parse(docs[0]) );
      // console.log(typeof(docs[0].toJSON()));
      // console.log(docs[0].images);
      // console.log(Object.keys(docs[0].special_offer));
      // docs.forEach( function(product){
      //   console.log(product['special_offer']['mode']);
      // })

      console.log('Successfuly read from db: Xigi.Product, id: ' + productId);
      res.render('home',{
          description: home,
          productObjectJSON: docs[0].toJSON(),
          product: docs,
          //keys for looping through json
          keysDescription: keysDescription,

      });
    }
  }).clone().catch(function(err){
    console.log(err);
  });
  // res.render('home',{
  //     description: home
  // });
  // //log section
  // console.log('Website: ' + home);
});
//-------ABOUT
app.get("/about", function(req, res){
  res.render('about',{
      description: about
  });
  //log section
  console.log('Website: ' + about);
});
//-------CONTACT
app.get("/contact", function(req, res){
  res.render('contact',{
      description: contact
  });
  //log section
  console.log('Website: ' + contact);
});
//-------BASKET
app.get("/basket", function(req, res){
  res.render('basket',{
      description: basket
  });
  //log section
  console.log('Website: ' + basket);
});
//-------HELP
app.get("/help", function(req, res){
  res.render('help',{
      description: help
  });
  //log section
  console.log('Website: ' + help);
});
//-------PRODUCT_CATEGORY
app.get("/productCategory", function(req, res){
  res.render('products_category',{
      description: productsCategory
  });
  //log section
  console.log('Website: ' + productsCategory);
});
//-------PRODUCT ( ad id of the product to make dinamic url)
app.get("/product", function(req, res){
  console.log('Website: ' + product);
  let productId= '625756527b879ad87ea02bda'
  Product.find({_id: productId}, function(err, docs){
    if(err){
      console.log('Error in db search: \n'+ err);
    }else{

      docs.forEach( function(product){
        console.log(product['special_offer']['mode']);
      })

      console.log('Successfuly read from db: Xigi.Product, id: ' + productId);
      res.render('product',{
          description: product,
          product: docs,
          //keys for looping through json
          keys: productKeys,
          keysSpecialOffer: specialOfferKeys,
          keysSpecification: specificationKeys,
          keysProcessor: processorKeys

      });
    }
  }).clone().catch(function(err){
    console.log(err);
  });
});
//-------TRENDS
app.get("/trends", function(req, res){
  res.render('trends',{
      description: trends
  });
  //log section
  console.log('Website: ' + trends);
});
//-------WISH_LIST
app.get("/wishList", function(req, res){
  res.render('wish_list',{
      description: wishList
  });
  //log section
  console.log('Website: ' + wishList);
});
//-------ACCOUNT
app.get("/account", function(req, res){
  res.render('account',{
      description: account
  });
  //log section
  console.log('Website: ' + account);
});
//------------------SERVER CONFIG [ CLOSE CONNECTION ]----------------------
let port = process.env.PORT; // use port form heroku webservice
if (port == null || port == ''){
  port = LAN_PORT;
}
app.listen(port, function(){
  console.log('Server has started successfuly on port '+ port);
});
