

function generateCRUDCoordinatorActor() {
    var smqCRUDCoordinator = {
    };
    
    smqCRUDCoordinator.defer = function() {
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

    smqCRUDCoordinator.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqCRUDCoordinator.showPingPongs = true` to get verbose logging.');
        smqCRUDCoordinator.virtualHost = virtualHost;
        smqCRUDCoordinator.username = username;
        smqCRUDCoordinator.password = password;
        smqCRUDCoordinator.rabbitEndpoint = smqCRUDCoordinator.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqCRUDCoordinator.CRUDCoordinator_all_connection = {};
        smqCRUDCoordinator.messages = [];
        smqCRUDCoordinator.waitingReply = [];
        
        smqCRUDCoordinator.client = Stomp.client(smqCRUDCoordinator.rabbitEndpoint);

        smqCRUDCoordinator.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqCRUDCoordinator.showPingPongs) return;
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

        smqCRUDCoordinator.checkMessage = function(msg) {
            
                if (smqCRUDCoordinator.onGuestRequestToken) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.requesttoken'))) {
                        var rpayload = smqCRUDCoordinator.onGuestRequestToken(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestValidateTemporaryAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.validatetemporaryaccesstoken'))) {
                        var rpayload = smqCRUDCoordinator.onGuestValidateTemporaryAccessToken(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestWhoAmI) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.whoami'))) {
                        var rpayload = smqCRUDCoordinator.onGuestWhoAmI(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestWhoAreYou) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.whoareyou'))) {
                        var rpayload = smqCRUDCoordinator.onGuestWhoAreYou(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestStoreTempFile) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.storetempfile'))) {
                        var rpayload = smqCRUDCoordinator.onGuestStoreTempFile(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onCRUDCoordinatorResetRabbitSassyMQConfiguration) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.crudcoordinator.resetrabbitsassymqconfiguration'))) {
                        var rpayload = smqCRUDCoordinator.onCRUDCoordinatorResetRabbitSassyMQConfiguration(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onCRUDCoordinatorResetJWTSecretKey) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.crudcoordinator.resetjwtsecretkey'))) {
                        var rpayload = smqCRUDCoordinator.onCRUDCoordinatorResetJWTSecretKey(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestGetNetworks) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.getnetworks'))) {
                        var rpayload = smqCRUDCoordinator.onGuestGetNetworks(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestGetNetworkById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.getnetworkbyid'))) {
                        var rpayload = smqCRUDCoordinator.onGuestGetNetworkById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetNetworks) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getnetworks'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetNetworks(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetNetworkById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getnetworkbyid'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetNetworkById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddNetwork) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.addnetwork'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddNetwork(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetNetworks) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getnetworks'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetNetworks(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetNetworkById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getnetworkbyid'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetNetworkById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateNetwork) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.updatenetwork'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateNetwork(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteNetwork) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.deletenetwork'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteNetwork(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetAppUsers) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getappusers'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetAppUsers(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetAppUserById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getappuserbyid'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetAppUserById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddAppUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.addappuser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddAppUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetAppUsers) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getappusers'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetAppUsers(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetAppUserById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getappuserbyid'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetAppUserById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateAppUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.updateappuser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateAppUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteAppUser) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.deleteappuser'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteAppUser(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberAddMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.addmyshow'))) {
                        var rpayload = smqCRUDCoordinator.onMemberAddMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetMyShows) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getmyshows'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetMyShows(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetMyShowById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getmyshowbyid'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetMyShowById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberUpdateMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.updatemyshow'))) {
                        var rpayload = smqCRUDCoordinator.onMemberUpdateMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberDeleteMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.deletemyshow'))) {
                        var rpayload = smqCRUDCoordinator.onMemberDeleteMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.addmyshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetMyShows) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getmyshows'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetMyShows(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetMyShowById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getmyshowbyid'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetMyShowById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.updatemyshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteMyShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.deletemyshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteMyShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestGetShows) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.getshows'))) {
                        var rpayload = smqCRUDCoordinator.onGuestGetShows(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onGuestGetShowById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.guest.getshowbyid'))) {
                        var rpayload = smqCRUDCoordinator.onGuestGetShowById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetShows) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getshows'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetShows(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onMemberGetShowById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.member.getshowbyid'))) {
                        var rpayload = smqCRUDCoordinator.onMemberGetShowById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminAddShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.addshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminAddShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShows) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getshows'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShows(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminGetShowById) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.getshowbyid'))) {
                        var rpayload = smqCRUDCoordinator.onAdminGetShowById(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminUpdateShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.updateshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminUpdateShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqCRUDCoordinator.onAdminDeleteShow) {
                    if (msg.headers && (msg.headers.destination.includes('crudcoordinator.general.admin.deleteshow'))) {
                        var rpayload = smqCRUDCoordinator.onAdminDeleteShow(msg.body, msg);
                        if (rpayload) smqCRUDCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'Guest' can hear.
                
                // Can also hear what 'Member' can hear.
                
                // Can also hear what 'Admin' can hear.
                
               
        }

        var on_connect = function (x) {
            smqCRUDCoordinator.CRUDCoordinator_all_connection = smqCRUDCoordinator.client.subscribe("/exchange/crudcoordinator.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqCRUDCoordinator.messages.push(d);
                        smqCRUDCoordinator.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqCRUDCoordinator.showPingPongs) console.log('      --------  MESSAGE FOR smqCRUDCoordinator: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqCRUDCoordinator.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqCRUDCoordinator.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqCRUDCoordinator.waitingReply[corrID];
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

        console.log('connecting to: ' + smqCRUDCoordinator.rabbitEndpoint + ', using ' + username + '/' + password);
        smqCRUDCoordinator.client.connect(smqCRUDCoordinator.username, smqCRUDCoordinator.password, on_connect, on_error, smqCRUDCoordinator.virtualHost);
    };

    smqCRUDCoordinator.disconnect = function() {
        if (smqCRUDCoordinator && smqCRUDCoordinator.client) 
        {
            smqCRUDCoordinator.client.disconnect();
        }
    }

    smqCRUDCoordinator.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqCRUDCoordinator.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqCRUDCoordinator.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.ResetRabbitSassyMQConfiguration = function() {
            smqCRUDCoordinator.ResetRabbitSassyMQConfiguration('{}');
        }

        smqCRUDCoordinator.ResetRabbitSassyMQConfiguration = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqCRUDCoordinator.showPingPongs) console.log('Reset Rabbit Sassy M Q Configuration - ');
            smqCRUDCoordinator.client.send('/exchange/crudcoordinatormic/crudcoordinator.general.crudcoordinator.resetrabbitsassymqconfiguration', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.ResetJWTSecretKey = function() {
            smqCRUDCoordinator.ResetJWTSecretKey('{}');
        }

        smqCRUDCoordinator.ResetJWTSecretKey = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqCRUDCoordinator.showPingPongs) console.log('Reset J W T Secret Key - ');
            smqCRUDCoordinator.client.send('/exchange/crudcoordinatormic/crudcoordinator.general.crudcoordinator.resetjwtsecretkey', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.GuestRequestToken = function() {
            smqCRUDCoordinator.GuestRequestToken('{}');
        }

        smqCRUDCoordinator.GuestRequestToken = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Request Token - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.requesttoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestValidateTemporaryAccessToken = function() {
            smqCRUDCoordinator.GuestValidateTemporaryAccessToken('{}');
        }

        smqCRUDCoordinator.GuestValidateTemporaryAccessToken = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Validate Temporary Access Token - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.validatetemporaryaccesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestWhoAmI = function() {
            smqCRUDCoordinator.GuestWhoAmI('{}');
        }

        smqCRUDCoordinator.GuestWhoAmI = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Who Am I - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.whoami', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestWhoAreYou = function() {
            smqCRUDCoordinator.GuestWhoAreYou('{}');
        }

        smqCRUDCoordinator.GuestWhoAreYou = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Who Are You - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.whoareyou', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestStoreTempFile = function() {
            smqCRUDCoordinator.GuestStoreTempFile('{}');
        }

        smqCRUDCoordinator.GuestStoreTempFile = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Store Temp File - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.storetempfile', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestGetNetworks = function() {
            smqCRUDCoordinator.GuestGetNetworks('{}');
        }

        smqCRUDCoordinator.GuestGetNetworks = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Get Networks - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.getnetworks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestGetNetworkById = function() {
            smqCRUDCoordinator.GuestGetNetworkById('{}');
        }

        smqCRUDCoordinator.GuestGetNetworkById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Get Network By Id - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.getnetworkbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestGetShows = function() {
            smqCRUDCoordinator.GuestGetShows('{}');
        }

        smqCRUDCoordinator.GuestGetShows = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Get Shows - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.getshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.GuestGetShowById = function() {
            smqCRUDCoordinator.GuestGetShowById('{}');
        }

        smqCRUDCoordinator.GuestGetShowById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Get Show By Id - ');
            smqCRUDCoordinator.client.send('/exchange/guestmic/crudcoordinator.general.guest.getshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Member' can say.
            
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.MemberGetNetworks = function() {
            smqCRUDCoordinator.MemberGetNetworks('{}');
        }

        smqCRUDCoordinator.MemberGetNetworks = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get Networks - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getnetworks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetNetworkById = function() {
            smqCRUDCoordinator.MemberGetNetworkById('{}');
        }

        smqCRUDCoordinator.MemberGetNetworkById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get Network By Id - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getnetworkbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetAppUsers = function() {
            smqCRUDCoordinator.MemberGetAppUsers('{}');
        }

        smqCRUDCoordinator.MemberGetAppUsers = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get App Users - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getappusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetAppUserById = function() {
            smqCRUDCoordinator.MemberGetAppUserById('{}');
        }

        smqCRUDCoordinator.MemberGetAppUserById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get App User By Id - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getappuserbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberAddMyShow = function() {
            smqCRUDCoordinator.MemberAddMyShow('{}');
        }

        smqCRUDCoordinator.MemberAddMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Add My Show - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.addmyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetMyShows = function() {
            smqCRUDCoordinator.MemberGetMyShows('{}');
        }

        smqCRUDCoordinator.MemberGetMyShows = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get My Shows - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getmyshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetMyShowById = function() {
            smqCRUDCoordinator.MemberGetMyShowById('{}');
        }

        smqCRUDCoordinator.MemberGetMyShowById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get My Show By Id - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getmyshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberUpdateMyShow = function() {
            smqCRUDCoordinator.MemberUpdateMyShow('{}');
        }

        smqCRUDCoordinator.MemberUpdateMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Update My Show - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.updatemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberDeleteMyShow = function() {
            smqCRUDCoordinator.MemberDeleteMyShow('{}');
        }

        smqCRUDCoordinator.MemberDeleteMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Delete My Show - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.deletemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetShows = function() {
            smqCRUDCoordinator.MemberGetShows('{}');
        }

        smqCRUDCoordinator.MemberGetShows = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get Shows - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.MemberGetShowById = function() {
            smqCRUDCoordinator.MemberGetShowById('{}');
        }

        smqCRUDCoordinator.MemberGetShowById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqMember.showPingPongs) console.log('Get Show By Id - ');
            smqCRUDCoordinator.client.send('/exchange/membermic/crudcoordinator.general.member.getshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Admin' can say.
            
        
        smqCRUDCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqCRUDCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqCRUDCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqCRUDCoordinator.AdminAddNetwork = function() {
            smqCRUDCoordinator.AdminAddNetwork('{}');
        }

        smqCRUDCoordinator.AdminAddNetwork = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Network - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.addnetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetNetworks = function() {
            smqCRUDCoordinator.AdminGetNetworks('{}');
        }

        smqCRUDCoordinator.AdminGetNetworks = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Networks - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getnetworks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetNetworkById = function() {
            smqCRUDCoordinator.AdminGetNetworkById('{}');
        }

        smqCRUDCoordinator.AdminGetNetworkById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Network By Id - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getnetworkbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateNetwork = function() {
            smqCRUDCoordinator.AdminUpdateNetwork('{}');
        }

        smqCRUDCoordinator.AdminUpdateNetwork = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Network - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.updatenetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteNetwork = function() {
            smqCRUDCoordinator.AdminDeleteNetwork('{}');
        }

        smqCRUDCoordinator.AdminDeleteNetwork = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Network - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.deletenetwork', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddAppUser = function() {
            smqCRUDCoordinator.AdminAddAppUser('{}');
        }

        smqCRUDCoordinator.AdminAddAppUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add App User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.addappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetAppUsers = function() {
            smqCRUDCoordinator.AdminGetAppUsers('{}');
        }

        smqCRUDCoordinator.AdminGetAppUsers = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get App Users - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getappusers', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetAppUserById = function() {
            smqCRUDCoordinator.AdminGetAppUserById('{}');
        }

        smqCRUDCoordinator.AdminGetAppUserById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get App User By Id - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getappuserbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateAppUser = function() {
            smqCRUDCoordinator.AdminUpdateAppUser('{}');
        }

        smqCRUDCoordinator.AdminUpdateAppUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update App User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.updateappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteAppUser = function() {
            smqCRUDCoordinator.AdminDeleteAppUser('{}');
        }

        smqCRUDCoordinator.AdminDeleteAppUser = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete App User - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.deleteappuser', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddMyShow = function() {
            smqCRUDCoordinator.AdminAddMyShow('{}');
        }

        smqCRUDCoordinator.AdminAddMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add My Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.addmyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetMyShows = function() {
            smqCRUDCoordinator.AdminGetMyShows('{}');
        }

        smqCRUDCoordinator.AdminGetMyShows = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get My Shows - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getmyshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetMyShowById = function() {
            smqCRUDCoordinator.AdminGetMyShowById('{}');
        }

        smqCRUDCoordinator.AdminGetMyShowById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get My Show By Id - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getmyshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateMyShow = function() {
            smqCRUDCoordinator.AdminUpdateMyShow('{}');
        }

        smqCRUDCoordinator.AdminUpdateMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update My Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.updatemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteMyShow = function() {
            smqCRUDCoordinator.AdminDeleteMyShow('{}');
        }

        smqCRUDCoordinator.AdminDeleteMyShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete My Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.deletemyshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminAddShow = function() {
            smqCRUDCoordinator.AdminAddShow('{}');
        }

        smqCRUDCoordinator.AdminAddShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Add Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.addshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShows = function() {
            smqCRUDCoordinator.AdminGetShows('{}');
        }

        smqCRUDCoordinator.AdminGetShows = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Shows - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getshows', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminGetShowById = function() {
            smqCRUDCoordinator.AdminGetShowById('{}');
        }

        smqCRUDCoordinator.AdminGetShowById = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Get Show By Id - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.getshowbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminUpdateShow = function() {
            smqCRUDCoordinator.AdminUpdateShow('{}');
        }

        smqCRUDCoordinator.AdminUpdateShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Update Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.updateshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqCRUDCoordinator.AdminDeleteShow = function() {
            smqCRUDCoordinator.AdminDeleteShow('{}');
        }

        smqCRUDCoordinator.AdminDeleteShow = function(payload) {
            payload = smqCRUDCoordinator.stringifyValue(payload);
            var id = smqCRUDCoordinator.createUUID();
            var deferred = smqCRUDCoordinator.waitingReply[id] = smqCRUDCoordinator.defer();
            if (smqAdmin.showPingPongs) console.log('Delete Show - ');
            smqCRUDCoordinator.client.send('/exchange/adminmic/crudcoordinator.general.admin.deleteshow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqCRUDCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqCRUDCoordinator;
}

                    