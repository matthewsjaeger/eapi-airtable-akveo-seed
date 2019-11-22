

function generateAdminActor() {
    var smqAdmin = {
    };
    
    smqAdmin.defer = function() {
        var deferred = {
            promise: null,
            resolve: null,
            reject: null
        };
        
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        
        return deferred;
    }

    smqAdmin.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqAdmin.showPingPongs = true` to get verbose logging.');
        smqAdmin.virtualHost = virtualHost;
        smqAdmin.username = username;
        smqAdmin.password = password;
        smqAdmin.rabbitEndpoint = smqAdmin.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqAdmin.Admin_all_connection = {};
        smqAdmin.messages = [];
        smqAdmin.waitingReply = [];
        
        smqAdmin.client = Stomp.client(smqAdmin.rabbitEndpoint);

        smqAdmin.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqAdmin.showPingPongs) return;
            else {
                if (m == "<<< ") delete m;
                let data = p || m || "STRING"; 
                let indexOfContentLength = data.indexOf("content-length:");
                let dataStart = data.indexOf("\n\n");
                if ((dataStart > indexOfContentLength) && (indexOfContentLength > 1)) {
                    data = (data.substring(dataStart, data.length - 1) || '');
                    if (data.startsWith('"')) data = data.substring(1);
                    if (data.endsWith('"')) data = data.substring(0, data.length - 1);
                    data = data.substring(data.indexOf('{'));
                    data = data.substring(0, data.lastIndexOf('}') + 1);
                    try {
                        data = JSON.parse(data);
                        if (data.AccessToken) data.AccessToken = 'ay_******xyz';
                    } catch(ex) {
                        console.error('ERROR PARSING DATA for debug output', ex, data);
                    }
                    m = m.substring(0, m.indexOf('\n\n'));
                }
                console.log("DEBUG: ", m, data || p); 
            }
        }

        smqAdmin.checkMessage = function(msg) {
            
               
        }

        var on_connect = function (x) {
            smqAdmin.Admin_all_connection = smqAdmin.client.subscribe("/exchange/admin.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqAdmin.messages.push(d);
                        smqAdmin.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqAdmin.showPingPongs) console.log('      --------  MESSAGE FOR smqAdmin: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqAdmin.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqAdmin.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqAdmin.waitingReply[corrID];
                            if (body && body.ErrorMessage) console.error("ERROR RECEIVED: " + body.ErrorMessage);
                            waitingDeferred.resolve(body, d);
                        }
                    };
                    if (after_connect) after_connect(x);
                };

        var on_error = function (frame) {
            frame = frame || { 'error': 'unspecified error' };
            console.error('ERROR On STOMP Client: ', frame.error, frame);
        };

        console.log('connecting to: ' + smqAdmin.rabbitEndpoint + ', using ' + username + '/' + password);
        smqAdmin.client.connect(smqAdmin.username, smqAdmin.password, on_connect, on_error, smqAdmin.virtualHost);
    };

    smqAdmin.disconnect = function() {
        if (smqAdmin && smqAdmin.client) 
        {
            smqAdmin.client.disconnect();
        }
    }

    smqAdmin.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqAdmin.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqAdmin.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdmin.AddNetwork = function() {
            smqAdmin.AddNetwork('{}');
        }

        smqAdmin.AddNetwork = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Network - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.addnetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetNetworks = function() {
            smqAdmin.GetNetworks('{}');
        }

        smqAdmin.GetNetworks = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Networks - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getnetworks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetNetworkById = function() {
            smqAdmin.GetNetworkById('{}');
        }

        smqAdmin.GetNetworkById = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Network By Id - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getnetworkbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateNetwork = function() {
            smqAdmin.UpdateNetwork('{}');
        }

        smqAdmin.UpdateNetwork = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Network - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.updatenetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteNetwork = function() {
            smqAdmin.DeleteNetwork('{}');
        }

        smqAdmin.DeleteNetwork = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Network - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.deletenetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddAppUser = function() {
            smqAdmin.AddAppUser('{}');
        }

        smqAdmin.AddAppUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add App User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.addappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetAppUsers = function() {
            smqAdmin.GetAppUsers('{}');
        }

        smqAdmin.GetAppUsers = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get App Users - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getappusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetAppUserById = function() {
            smqAdmin.GetAppUserById('{}');
        }

        smqAdmin.GetAppUserById = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get App User By Id - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getappuserbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateAppUser = function() {
            smqAdmin.UpdateAppUser('{}');
        }

        smqAdmin.UpdateAppUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update App User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.updateappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteAppUser = function() {
            smqAdmin.DeleteAppUser('{}');
        }

        smqAdmin.DeleteAppUser = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete App User - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.deleteappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddMyShow = function() {
            smqAdmin.AddMyShow('{}');
        }

        smqAdmin.AddMyShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add My Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.addmyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetMyShows = function() {
            smqAdmin.GetMyShows('{}');
        }

        smqAdmin.GetMyShows = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get My Shows - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getmyshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetMyShowById = function() {
            smqAdmin.GetMyShowById('{}');
        }

        smqAdmin.GetMyShowById = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get My Show By Id - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getmyshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateMyShow = function() {
            smqAdmin.UpdateMyShow('{}');
        }

        smqAdmin.UpdateMyShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update My Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.updatemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteMyShow = function() {
            smqAdmin.DeleteMyShow('{}');
        }

        smqAdmin.DeleteMyShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete My Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.deletemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.AddShow = function() {
            smqAdmin.AddShow('{}');
        }

        smqAdmin.AddShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Add Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.addshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShows = function() {
            smqAdmin.GetShows('{}');
        }

        smqAdmin.GetShows = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shows - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.GetShowById = function() {
            smqAdmin.GetShowById('{}');
        }

        smqAdmin.GetShowById = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Get Show By Id - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.getshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.UpdateShow = function() {
            smqAdmin.UpdateShow('{}');
        }

        smqAdmin.UpdateShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Update Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.updateshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdmin.DeleteShow = function() {
            smqAdmin.DeleteShow('{}');
        }

        smqAdmin.DeleteShow = function(payload) {
            payload = smqAdmin.stringifyValue(payload);
            var id = smqAdmin.createUUID();
            var deferred = smqAdmin.waitingReply[id] = smqAdmin.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Show - ');
            smqAdmin.client.send('/exchange/adminmic/crudcoordinator.general.admin.deleteshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdmin.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqAdmin;
}

                    