

function generateBJFeltLogActor() {
    var smqBJFeltLog = {
    };
    
    smqBJFeltLog.defer = function() {
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

    smqBJFeltLog.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqBJFeltLog.showPingPongs = true` to get verbose logging.');
        smqBJFeltLog.virtualHost = virtualHost;
        smqBJFeltLog.username = username;
        smqBJFeltLog.password = password;
        smqBJFeltLog.rabbitEndpoint = smqBJFeltLog.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqBJFeltLog.BJFeltLog_all_connection = {};
        smqBJFeltLog.messages = [];
        smqBJFeltLog.waitingReply = [];
        
        smqBJFeltLog.client = Stomp.client(smqBJFeltLog.rabbitEndpoint);

        smqBJFeltLog.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqBJFeltLog.showPingPongs) return;
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

        smqBJFeltLog.checkMessage = function(msg) {
            
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqBJFeltLog.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqBJFeltLog.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqBJFeltLog.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqBJFeltLog.BJFeltLog_all_connection = smqBJFeltLog.client.subscribe("/exchange/bjfeltlog.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqBJFeltLog.messages.push(d);
                        smqBJFeltLog.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqBJFeltLog.showPingPongs) console.log('      --------  MESSAGE FOR smqBJFeltLog: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqBJFeltLog.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqBJFeltLog.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqBJFeltLog.waitingReply[corrID];
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

        console.log('connecting to: ' + smqBJFeltLog.rabbitEndpoint + ', using ' + username + '/' + password);
        smqBJFeltLog.client.connect(smqBJFeltLog.username, smqBJFeltLog.password, on_connect, on_error, smqBJFeltLog.virtualHost);
    };

    smqBJFeltLog.disconnect = function() {
        if (smqBJFeltLog && smqBJFeltLog.client) 
        {
            smqBJFeltLog.client.disconnect();
        }
    }

    smqBJFeltLog.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqBJFeltLog.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqBJFeltLog.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqBJFeltLog.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqBJFeltLog.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqBJFeltLog.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqBJFeltLog.Ping = function() {
            smqBJFeltLog.Ping('{}');
        }

        smqBJFeltLog.Ping = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.UpdateTableInfo = function() {
            smqBJFeltLog.UpdateTableInfo('{}');
        }

        smqBJFeltLog.UpdateTableInfo = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.CompleteTableModification = function() {
            smqBJFeltLog.CompleteTableModification('{}');
        }

        smqBJFeltLog.CompleteTableModification = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.EndTournament = function() {
            smqBJFeltLog.EndTournament('{}');
        }

        smqBJFeltLog.EndTournament = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ScheduleTableRemoval = function() {
            smqBJFeltLog.ScheduleTableRemoval('{}');
        }

        smqBJFeltLog.ScheduleTableRemoval = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ServiceShuffleMaster = function() {
            smqBJFeltLog.ServiceShuffleMaster('{}');
        }

        smqBJFeltLog.ServiceShuffleMaster = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ScheduleBJTournament = function() {
            smqBJFeltLog.ScheduleBJTournament('{}');
        }

        smqBJFeltLog.ScheduleBJTournament = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ReceiveShuffleMaster = function() {
            smqBJFeltLog.ReceiveShuffleMaster('{}');
        }

        smqBJFeltLog.ReceiveShuffleMaster = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.TableAddNotification = function() {
            smqBJFeltLog.TableAddNotification('{}');
        }

        smqBJFeltLog.TableAddNotification = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ActivateTournament = function() {
            smqBJFeltLog.ActivateTournament('{}');
        }

        smqBJFeltLog.ActivateTournament = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.CompleteTableAdd = function() {
            smqBJFeltLog.CompleteTableAdd('{}');
        }

        smqBJFeltLog.CompleteTableAdd = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.CompleteTableRemoval = function() {
            smqBJFeltLog.CompleteTableRemoval('{}');
        }

        smqBJFeltLog.CompleteTableRemoval = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.ScheduleTableModification = function() {
            smqBJFeltLog.ScheduleTableModification('{}');
        }

        smqBJFeltLog.ScheduleTableModification = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.LogFeltChange = function() {
            smqBJFeltLog.LogFeltChange('{}');
        }

        smqBJFeltLog.LogFeltChange = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GetBlackTables = function() {
            smqBJFeltLog.GetBlackTables('{}');
        }

        smqBJFeltLog.GetBlackTables = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GetShuffleMasters = function() {
            smqBJFeltLog.GetShuffleMasters('{}');
        }

        smqBJFeltLog.GetShuffleMasters = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GetBlackTableProjects = function() {
            smqBJFeltLog.GetBlackTableProjects('{}');
        }

        smqBJFeltLog.GetBlackTableProjects = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqBJFeltLog.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqBJFeltLog.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqBJFeltLog.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqBJFeltLog.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqBJFeltLog.GAINSUserPing = function() {
            smqBJFeltLog.GAINSUserPing('{}');
        }

        smqBJFeltLog.GAINSUserPing = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserMyRoles = function() {
            smqBJFeltLog.GAINSUserMyRoles('{}');
        }

        smqBJFeltLog.GAINSUserMyRoles = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetAssetCountsByWorkflow = function() {
            smqBJFeltLog.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqBJFeltLog.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetGamingLocations = function() {
            smqBJFeltLog.GAINSUserGetGamingLocations('{}');
        }

        smqBJFeltLog.GAINSUserGetGamingLocations = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetRelevantActions = function() {
            smqBJFeltLog.GAINSUserGetRelevantActions('{}');
        }

        smqBJFeltLog.GAINSUserGetRelevantActions = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetVersion = function() {
            smqBJFeltLog.GAINSUserGetVersion('{}');
        }

        smqBJFeltLog.GAINSUserGetVersion = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetAssetStatuses = function() {
            smqBJFeltLog.GAINSUserGetAssetStatuses('{}');
        }

        smqBJFeltLog.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetAssetsByStatus = function() {
            smqBJFeltLog.GAINSUserGetAssetsByStatus('{}');
        }

        smqBJFeltLog.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetFilteredAssetList = function() {
            smqBJFeltLog.GAINSUserGetFilteredAssetList('{}');
        }

        smqBJFeltLog.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetProjects = function() {
            smqBJFeltLog.GAINSUserGetProjects('{}');
        }

        smqBJFeltLog.GAINSUserGetProjects = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserUpdateProject = function() {
            smqBJFeltLog.GAINSUserUpdateProject('{}');
        }

        smqBJFeltLog.GAINSUserUpdateProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserAddProject = function() {
            smqBJFeltLog.GAINSUserAddProject('{}');
        }

        smqBJFeltLog.GAINSUserAddProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetProjectBanks = function() {
            smqBJFeltLog.GAINSUserGetProjectBanks('{}');
        }

        smqBJFeltLog.GAINSUserGetProjectBanks = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserAddProjectAsset = function() {
            smqBJFeltLog.GAINSUserAddProjectAsset('{}');
        }

        smqBJFeltLog.GAINSUserAddProjectAsset = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserRemoveProjectAsset = function() {
            smqBJFeltLog.GAINSUserRemoveProjectAsset('{}');
        }

        smqBJFeltLog.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserSearchBJTables = function() {
            smqBJFeltLog.GAINSUserSearchBJTables('{}');
        }

        smqBJFeltLog.GAINSUserSearchBJTables = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserSearchATRs = function() {
            smqBJFeltLog.GAINSUserSearchATRs('{}');
        }

        smqBJFeltLog.GAINSUserSearchATRs = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserSearchStoredSlots = function() {
            smqBJFeltLog.GAINSUserSearchStoredSlots('{}');
        }

        smqBJFeltLog.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserSearchShuffleMasters = function() {
            smqBJFeltLog.GAINSUserSearchShuffleMasters('{}');
        }

        smqBJFeltLog.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserUpdateProjectBanks = function() {
            smqBJFeltLog.GAINSUserUpdateProjectBanks('{}');
        }

        smqBJFeltLog.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserDeleteProject = function() {
            smqBJFeltLog.GAINSUserDeleteProject('{}');
        }

        smqBJFeltLog.GAINSUserDeleteProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserCompleteProject = function() {
            smqBJFeltLog.GAINSUserCompleteProject('{}');
        }

        smqBJFeltLog.GAINSUserCompleteProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetCompletedProjects = function() {
            smqBJFeltLog.GAINSUserGetCompletedProjects('{}');
        }

        smqBJFeltLog.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetSlotProjects = function() {
            smqBJFeltLog.GAINSUserGetSlotProjects('{}');
        }

        smqBJFeltLog.GAINSUserGetSlotProjects = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserGetSlotProject = function() {
            smqBJFeltLog.GAINSUserGetSlotProject('{}');
        }

        smqBJFeltLog.GAINSUserGetSlotProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserCreateSlotProject = function() {
            smqBJFeltLog.GAINSUserCreateSlotProject('{}');
        }

        smqBJFeltLog.GAINSUserCreateSlotProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserAddSlotToProject = function() {
            smqBJFeltLog.GAINSUserAddSlotToProject('{}');
        }

        smqBJFeltLog.GAINSUserAddSlotToProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GAINSUserRemoveSlotFromProject = function() {
            smqBJFeltLog.GAINSUserRemoveSlotFromProject('{}');
        }

        smqBJFeltLog.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqBJFeltLog.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqBJFeltLog.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqBJFeltLog.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqBJFeltLog.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqBJFeltLog.GuestPing = function() {
            smqBJFeltLog.GuestPing('{}');
        }

        smqBJFeltLog.GuestPing = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqBJFeltLog.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        
        smqBJFeltLog.GuestLogin = function() {
            smqBJFeltLog.GuestLogin('{}');
        }

        smqBJFeltLog.GuestLogin = function(payload) {
            payload = smqBJFeltLog.stringifyValue(payload);
            var id = smqBJFeltLog.createUUID();
            var deferred = smqBJFeltLog.waitingReply[id] = smqBJFeltLog.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqBJFeltLog.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqBJFeltLog.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqBJFeltLog;
}

                    