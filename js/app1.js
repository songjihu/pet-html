App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    // 加载Adoption.json，保存了Adoption的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
    $.getJSON('Values.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
       // 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
      var ValuesArtifact = data;
      App.contracts.Values = TruffleContract(ValuesArtifact);
    
      // Set the provider for our contract
      App.contracts.Values.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markValues();
    });

    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleValues);
  },

   markValues: function(writers, account) {
    var valuesInstance;

    App.contracts.Values.deployed().then(function(instance) {
      valuesInstance = instance;

      // 调用合约的getAdopters(), 用call读取信息不用消耗gas
	  valuesInstance.send.call('0x68b28F6F06c4821Bb62A680AaFb513AD0a63D6be',100);
	  alert(valuesInstance.balances.call('0x68b28F6F06c4821Bb62A680AaFb513AD0a63D6be'));
	  var a ;
	  a = valuesInstance.balances.call('0x68b28F6F06c4821Bb62A680AaFb513AD0a63D6be');
      return a;
    }).then(function(writers) {
      for (i = 0; i < 1; i++) {
        if (true) {
			alert(writers);
          $('.panel-pet').eq(i).find('button').text(writers).attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  }
,

  handleValues: function(event) {
    event.preventDefault();

    var wvalue = parseInt($(event.target).data('id'));

    var valuesInstance;

    // 获取用户账号
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Values.deployed().then(function(instance) {
        valuesInstance = instance;
        // 发送交易领养宠物
        return valuesInstance.mintboom();
      }).then(function(result) {
        return App.markValues();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
