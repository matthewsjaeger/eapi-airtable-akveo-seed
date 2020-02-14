

function generateGamingAgentActor() {
    var smqGamingAgent = {
    };
    
    smqGamingAgent.defer = function() {
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

    smqGamingAgent.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqGamingAgent.showPingPongs = true` to get verbose logging.');
        smqGamingAgent.virtualHost = virtualHost;
        smqGamingAgent.username = username;
        smqGamingAgent.password = password;
        smqGamingAgent.rabbitEndpoint = smqGamingAgent.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqGamingAgent.GamingAgent_all_connection = {};
        smqGamingAgent.messages = [];
        smqGamingAgent.waitingReply = [];
        
        smqGamingAgent.client = Stomp.client(smqGamingAgent.rabbitEndpoint);

        smqGamingAgent.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqGamingAgent.showPingPongs) return;
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

        smqGamingAgent.checkMessage = function(msg) {
            
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqGamingAgent.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqGamingAgent.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqGamingAgent.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqGamingAgent.GamingAgent_all_connection = smqGamingAgent.client.subscribe("/exchange/gamingagent.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqGamingAgent.messages.push(d);
                        smqGamingAgent.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqGamingAgent.showPingPongs) console.log('      --------  MESSAGE FOR smqGamingAgent: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqGamingAgent.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqGamingAgent.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqGamingAgent.waitingReply[corrID];
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

        console.log('connecting to: ' + smqGamingAgent.rabbitEndpoint + ', using ' + username + '/' + password);
        smqGamingAgent.client.connect(smqGamingAgent.username, smqGamingAgent.password, on_connect, on_error, smqGamingAgent.virtualHost);
    };

    smqGamingAgent.disconnect = function() {
        if (smqGamingAgent && smqGamingAgent.client) 
        {
            smqGamingAgent.client.disconnect();
        }
    }

    smqGamingAgent.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqGamingAgent.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqGamingAgent.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqGamingAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGamingAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGamingAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGamingAgent.Ping = function() {
            smqGamingAgent.Ping('{}');
        }

        smqGamingAgent.Ping = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ScheduleBJTournament = function() {
            smqGamingAgent.ScheduleBJTournament('{}');
        }

        smqGamingAgent.ScheduleBJTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.CompleteTableAdd = function() {
            smqGamingAgent.CompleteTableAdd('{}');
        }

        smqGamingAgent.CompleteTableAdd = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ActivateTournament = function() {
            smqGamingAgent.ActivateTournament('{}');
        }

        smqGamingAgent.ActivateTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ScheduleTableModification = function() {
            smqGamingAgent.ScheduleTableModification('{}');
        }

        smqGamingAgent.ScheduleTableModification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ScheduleTableRemoval = function() {
            smqGamingAgent.ScheduleTableRemoval('{}');
        }

        smqGamingAgent.ScheduleTableRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.EndTournament = function() {
            smqGamingAgent.EndTournament('{}');
        }

        smqGamingAgent.EndTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.CompleteTableRemoval = function() {
            smqGamingAgent.CompleteTableRemoval('{}');
        }

        smqGamingAgent.CompleteTableRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.TableAddNotification = function() {
            smqGamingAgent.TableAddNotification('{}');
        }

        smqGamingAgent.TableAddNotification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.TableGamesFeltChecklist = function() {
            smqGamingAgent.TableGamesFeltChecklist('{}');
        }

        smqGamingAgent.TableGamesFeltChecklist = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ShuffleMasterVerification = function() {
            smqGamingAgent.ShuffleMasterVerification('{}');
        }

        smqGamingAgent.ShuffleMasterVerification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RelicensingSearch = function() {
            smqGamingAgent.RelicensingSearch('{}');
        }

        smqGamingAgent.RelicensingSearch = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.Relicense = function() {
            smqGamingAgent.Relicense('{}');
        }

        smqGamingAgent.Relicense = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GetRelicensesToRecheck = function() {
            smqGamingAgent.GetRelicensesToRecheck('{}');
        }

        smqGamingAgent.GetRelicensesToRecheck = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.Unlicense = function() {
            smqGamingAgent.Unlicense('{}');
        }

        smqGamingAgent.Unlicense = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.ResolveRecheck = function() {
            smqGamingAgent.ResolveRecheck('{}');
        }

        smqGamingAgent.ResolveRecheck = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GetGCInspectionRequiredList = function() {
            smqGamingAgent.GetGCInspectionRequiredList('{}');
        }

        smqGamingAgent.GetGCInspectionRequiredList = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GetFeltReviewList = function() {
            smqGamingAgent.GetFeltReviewList('{}');
        }

        smqGamingAgent.GetFeltReviewList = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.CompleteApplyLicense = function() {
            smqGamingAgent.CompleteApplyLicense('{}');
        }

        smqGamingAgent.CompleteApplyLicense = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.CompleteRemoval = function() {
            smqGamingAgent.CompleteRemoval('{}');
        }

        smqGamingAgent.CompleteRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.EditScheduledRemoval = function() {
            smqGamingAgent.EditScheduledRemoval('{}');
        }

        smqGamingAgent.EditScheduledRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.EditSealGC = function() {
            smqGamingAgent.EditSealGC('{}');
        }

        smqGamingAgent.EditSealGC = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.EditSealsFloor = function() {
            smqGamingAgent.EditSealsFloor('{}');
        }

        smqGamingAgent.EditSealsFloor = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.EmergencyDropInspection = function() {
            smqGamingAgent.EmergencyDropInspection('{}');
        }

        smqGamingAgent.EmergencyDropInspection = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GCInspection = function() {
            smqGamingAgent.GCInspection('{}');
        }

        smqGamingAgent.GCInspection = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.JPVerify100K = function() {
            smqGamingAgent.JPVerify100K('{}');
        }

        smqGamingAgent.JPVerify100K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.JPVerify10K = function() {
            smqGamingAgent.JPVerify10K('{}');
        }

        smqGamingAgent.JPVerify10K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.JPVerify20K = function() {
            smqGamingAgent.JPVerify20K('{}');
        }

        smqGamingAgent.JPVerify20K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.JPVerify50K = function() {
            smqGamingAgent.JPVerify50K('{}');
        }

        smqGamingAgent.JPVerify50K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.MediaVerification = function() {
            smqGamingAgent.MediaVerification('{}');
        }

        smqGamingAgent.MediaVerification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RamClearPerform = function() {
            smqGamingAgent.RamClearPerform('{}');
        }

        smqGamingAgent.RamClearPerform = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.StackerFullRecord = function() {
            smqGamingAgent.StackerFullRecord('{}');
        }

        smqGamingAgent.StackerFullRecord = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.StateOfMinnesotaInspection = function() {
            smqGamingAgent.StateOfMinnesotaInspection('{}');
        }

        smqGamingAgent.StateOfMinnesotaInspection = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.CompleteConversionFloorAdv = function() {
            smqGamingAgent.CompleteConversionFloorAdv('{}');
        }

        smqGamingAgent.CompleteConversionFloorAdv = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RamClearConversion = function() {
            smqGamingAgent.RamClearConversion('{}');
        }

        smqGamingAgent.RamClearConversion = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RamClearToInspect = function() {
            smqGamingAgent.RamClearToInspect('{}');
        }

        smqGamingAgent.RamClearToInspect = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RamClearToActive = function() {
            smqGamingAgent.RamClearToActive('{}');
        }

        smqGamingAgent.RamClearToActive = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.RequestActivation = function() {
            smqGamingAgent.RequestActivation('{}');
        }

        smqGamingAgent.RequestActivation = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.SuspendedJPReverify100K = function() {
            smqGamingAgent.SuspendedJPReverify100K('{}');
        }

        smqGamingAgent.SuspendedJPReverify100K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.SuspendedJPReverify10K = function() {
            smqGamingAgent.SuspendedJPReverify10K('{}');
        }

        smqGamingAgent.SuspendedJPReverify10K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.SuspendedJPReverify20K = function() {
            smqGamingAgent.SuspendedJPReverify20K('{}');
        }

        smqGamingAgent.SuspendedJPReverify20K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.SuspendedJPReverify50K = function() {
            smqGamingAgent.SuspendedJPReverify50K('{}');
        }

        smqGamingAgent.SuspendedJPReverify50K = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqGamingAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqGamingAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGamingAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGamingAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGamingAgent.BJFeltLogPing = function() {
            smqGamingAgent.BJFeltLogPing('{}');
        }

        smqGamingAgent.BJFeltLogPing = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogUpdateTableInfo = function() {
            smqGamingAgent.BJFeltLogUpdateTableInfo('{}');
        }

        smqGamingAgent.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogCompleteTableModification = function() {
            smqGamingAgent.BJFeltLogCompleteTableModification('{}');
        }

        smqGamingAgent.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogEndTournament = function() {
            smqGamingAgent.BJFeltLogEndTournament('{}');
        }

        smqGamingAgent.BJFeltLogEndTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogScheduleTableRemoval = function() {
            smqGamingAgent.BJFeltLogScheduleTableRemoval('{}');
        }

        smqGamingAgent.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogServiceShuffleMaster = function() {
            smqGamingAgent.BJFeltLogServiceShuffleMaster('{}');
        }

        smqGamingAgent.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogScheduleBJTournament = function() {
            smqGamingAgent.BJFeltLogScheduleBJTournament('{}');
        }

        smqGamingAgent.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogReceiveShuffleMaster = function() {
            smqGamingAgent.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqGamingAgent.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogTableAddNotification = function() {
            smqGamingAgent.BJFeltLogTableAddNotification('{}');
        }

        smqGamingAgent.BJFeltLogTableAddNotification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogActivateTournament = function() {
            smqGamingAgent.BJFeltLogActivateTournament('{}');
        }

        smqGamingAgent.BJFeltLogActivateTournament = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogCompleteTableAdd = function() {
            smqGamingAgent.BJFeltLogCompleteTableAdd('{}');
        }

        smqGamingAgent.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogCompleteTableRemoval = function() {
            smqGamingAgent.BJFeltLogCompleteTableRemoval('{}');
        }

        smqGamingAgent.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogScheduleTableModification = function() {
            smqGamingAgent.BJFeltLogScheduleTableModification('{}');
        }

        smqGamingAgent.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogLogFeltChange = function() {
            smqGamingAgent.BJFeltLogLogFeltChange('{}');
        }

        smqGamingAgent.BJFeltLogLogFeltChange = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogGetBlackTables = function() {
            smqGamingAgent.BJFeltLogGetBlackTables('{}');
        }

        smqGamingAgent.BJFeltLogGetBlackTables = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogGetShuffleMasters = function() {
            smqGamingAgent.BJFeltLogGetShuffleMasters('{}');
        }

        smqGamingAgent.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.BJFeltLogGetBlackTableProjects = function() {
            smqGamingAgent.BJFeltLogGetBlackTableProjects('{}');
        }

        smqGamingAgent.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqGamingAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqGamingAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGamingAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGamingAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGamingAgent.GAINSUserPing = function() {
            smqGamingAgent.GAINSUserPing('{}');
        }

        smqGamingAgent.GAINSUserPing = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserMyRoles = function() {
            smqGamingAgent.GAINSUserMyRoles('{}');
        }

        smqGamingAgent.GAINSUserMyRoles = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetAssetCountsByWorkflow = function() {
            smqGamingAgent.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqGamingAgent.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetGamingLocations = function() {
            smqGamingAgent.GAINSUserGetGamingLocations('{}');
        }

        smqGamingAgent.GAINSUserGetGamingLocations = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetRelevantActions = function() {
            smqGamingAgent.GAINSUserGetRelevantActions('{}');
        }

        smqGamingAgent.GAINSUserGetRelevantActions = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetVersion = function() {
            smqGamingAgent.GAINSUserGetVersion('{}');
        }

        smqGamingAgent.GAINSUserGetVersion = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetAssetStatuses = function() {
            smqGamingAgent.GAINSUserGetAssetStatuses('{}');
        }

        smqGamingAgent.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetAssetsByStatus = function() {
            smqGamingAgent.GAINSUserGetAssetsByStatus('{}');
        }

        smqGamingAgent.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetFilteredAssetList = function() {
            smqGamingAgent.GAINSUserGetFilteredAssetList('{}');
        }

        smqGamingAgent.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetProjects = function() {
            smqGamingAgent.GAINSUserGetProjects('{}');
        }

        smqGamingAgent.GAINSUserGetProjects = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserUpdateProject = function() {
            smqGamingAgent.GAINSUserUpdateProject('{}');
        }

        smqGamingAgent.GAINSUserUpdateProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserAddProject = function() {
            smqGamingAgent.GAINSUserAddProject('{}');
        }

        smqGamingAgent.GAINSUserAddProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetProjectBanks = function() {
            smqGamingAgent.GAINSUserGetProjectBanks('{}');
        }

        smqGamingAgent.GAINSUserGetProjectBanks = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserAddProjectAsset = function() {
            smqGamingAgent.GAINSUserAddProjectAsset('{}');
        }

        smqGamingAgent.GAINSUserAddProjectAsset = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserRemoveProjectAsset = function() {
            smqGamingAgent.GAINSUserRemoveProjectAsset('{}');
        }

        smqGamingAgent.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserSearchBJTables = function() {
            smqGamingAgent.GAINSUserSearchBJTables('{}');
        }

        smqGamingAgent.GAINSUserSearchBJTables = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserSearchATRs = function() {
            smqGamingAgent.GAINSUserSearchATRs('{}');
        }

        smqGamingAgent.GAINSUserSearchATRs = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserSearchStoredSlots = function() {
            smqGamingAgent.GAINSUserSearchStoredSlots('{}');
        }

        smqGamingAgent.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserSearchOnFloorSlots = function() {
            smqGamingAgent.GAINSUserSearchOnFloorSlots('{}');
        }

        smqGamingAgent.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserSearchShuffleMasters = function() {
            smqGamingAgent.GAINSUserSearchShuffleMasters('{}');
        }

        smqGamingAgent.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserUpdateProjectBanks = function() {
            smqGamingAgent.GAINSUserUpdateProjectBanks('{}');
        }

        smqGamingAgent.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserDeleteProject = function() {
            smqGamingAgent.GAINSUserDeleteProject('{}');
        }

        smqGamingAgent.GAINSUserDeleteProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserCompleteProject = function() {
            smqGamingAgent.GAINSUserCompleteProject('{}');
        }

        smqGamingAgent.GAINSUserCompleteProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetCompletedProjects = function() {
            smqGamingAgent.GAINSUserGetCompletedProjects('{}');
        }

        smqGamingAgent.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetSlotProjects = function() {
            smqGamingAgent.GAINSUserGetSlotProjects('{}');
        }

        smqGamingAgent.GAINSUserGetSlotProjects = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetSlotProject = function() {
            smqGamingAgent.GAINSUserGetSlotProject('{}');
        }

        smqGamingAgent.GAINSUserGetSlotProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserCreateSlotProject = function() {
            smqGamingAgent.GAINSUserCreateSlotProject('{}');
        }

        smqGamingAgent.GAINSUserCreateSlotProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserAddSlotToProject = function() {
            smqGamingAgent.GAINSUserAddSlotToProject('{}');
        }

        smqGamingAgent.GAINSUserAddSlotToProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserRemoveSlotFromProject = function() {
            smqGamingAgent.GAINSUserRemoveSlotFromProject('{}');
        }

        smqGamingAgent.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetAllPeople = function() {
            smqGamingAgent.GAINSUserGetAllPeople('{}');
        }

        smqGamingAgent.GAINSUserGetAllPeople = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GAINSUserGetSlotViewDetails = function() {
            smqGamingAgent.GAINSUserGetSlotViewDetails('{}');
        }

        smqGamingAgent.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqGamingAgent.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqGamingAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGamingAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGamingAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGamingAgent.GuestPing = function() {
            smqGamingAgent.GuestPing('{}');
        }

        smqGamingAgent.GuestPing = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            smqGamingAgent.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGamingAgent.GuestLogin = function() {
            smqGamingAgent.GuestLogin('{}');
        }

        smqGamingAgent.GuestLogin = function(payload) {
            payload = smqGamingAgent.stringifyValue(payload);
            var id = smqGamingAgent.createUUID();
            var deferred = smqGamingAgent.waitingReply[id] = smqGamingAgent.defer();
            smqGamingAgent.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGamingAgent.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqGamingAgent;
}

