

function generateMemberActor() {
    var smqMember = {
    };
    
    smqMember.defer = function() {
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

    smqMember.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqMember.showPingPongs = true` to get verbose logging.');
        smqMember.virtualHost = virtualHost;
        smqMember.username = username;
        smqMember.password = password;
        smqMember.rabbitEndpoint = smqMember.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqMember.Member_all_connection = {};
        smqMember.messages = [];
        smqMember.waitingReply = [];
        
        smqMember.client = Stomp.client(smqMember.rabbitEndpoint);

        smqMember.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqMember.showPingPongs) return;
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

        smqMember.checkMessage = function(msg) {
            
               
        }

        var on_connect = function (x) {
            smqMember.Member_all_connection = smqMember.client.subscribe("/exchange/member.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqMember.messages.push(d);
                        smqMember.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqMember.showPingPongs) console.log('      --------  MESSAGE FOR smqMember: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqMember.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqMember.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqMember.waitingReply[corrID];
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

        console.log('connecting to: ' + smqMember.rabbitEndpoint + ', using ' + username + '/' + password);
        smqMember.client.connect(smqMember.username, smqMember.password, on_connect, on_error, smqMember.virtualHost);
    };

    smqMember.disconnect = function() {
        if (smqMember && smqMember.client) 
        {
            smqMember.client.disconnect();
        }
    }

    smqMember.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqMember.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqMember.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqMember.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqMember.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqMember.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqMember.GetNetworks = function() {
            smqMember.GetNetworks('{}');
        }

        smqMember.GetNetworks = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get Networks - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getnetworks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetNetworkById = function() {
            smqMember.GetNetworkById('{}');
        }

        smqMember.GetNetworkById = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get Network By Id - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getnetworkbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetAppUsers = function() {
            smqMember.GetAppUsers('{}');
        }

        smqMember.GetAppUsers = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get App Users - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getappusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetAppUserById = function() {
            smqMember.GetAppUserById('{}');
        }

        smqMember.GetAppUserById = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get App User By Id - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getappuserbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.AddMyShow = function() {
            smqMember.AddMyShow('{}');
        }

        smqMember.AddMyShow = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Add My Show - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.addmyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetMyShows = function() {
            smqMember.GetMyShows('{}');
        }

        smqMember.GetMyShows = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get My Shows - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getmyshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetMyShowById = function() {
            smqMember.GetMyShowById('{}');
        }

        smqMember.GetMyShowById = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get My Show By Id - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getmyshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.UpdateMyShow = function() {
            smqMember.UpdateMyShow('{}');
        }

        smqMember.UpdateMyShow = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Update My Show - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.updatemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.DeleteMyShow = function() {
            smqMember.DeleteMyShow('{}');
        }

        smqMember.DeleteMyShow = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Delete My Show - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.deletemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetShows = function() {
            smqMember.GetShows('{}');
        }

        smqMember.GetShows = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get Shows - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        
        smqMember.GetShowById = function() {
            smqMember.GetShowById('{}');
        }

        smqMember.GetShowById = function(payload) {
            payload = smqMember.stringifyValue(payload);
            var id = smqMember.createUUID();
            var deferred = smqMember.waitingReply[id] = smqMember.defer();
            if (smqMember.showPingPongs) console.log('Get Show By Id - ');
            smqMember.client.send('/exchange/membermic/crudcoordinator.general.member.getshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqMember.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqMember;
}

                    