

function generateGAINSUserActor() {
    var smqGAINSUser = {
    };
    
    smqGAINSUser.defer = function() {
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

    smqGAINSUser.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqGAINSUser.showPingPongs = true` to get verbose logging.');
        smqGAINSUser.virtualHost = virtualHost;
        smqGAINSUser.username = username;
        smqGAINSUser.password = password;
        smqGAINSUser.rabbitEndpoint = smqGAINSUser.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqGAINSUser.GAINSUser_all_connection = {};
        smqGAINSUser.messages = [];
        smqGAINSUser.waitingReply = [];
        
        smqGAINSUser.client = Stomp.client(smqGAINSUser.rabbitEndpoint);

        smqGAINSUser.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqGAINSUser.showPingPongs) return;
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

        smqGAINSUser.checkMessage = function(msg) {
            
                // Can also hear what 'Guest' can hear.
                
                if (smqGAINSUser.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqGAINSUser.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqGAINSUser.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqGAINSUser.GAINSUser_all_connection = smqGAINSUser.client.subscribe("/exchange/gainsuser.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqGAINSUser.messages.push(d);
                        smqGAINSUser.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqGAINSUser.showPingPongs) console.log('      --------  MESSAGE FOR smqGAINSUser: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqGAINSUser.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqGAINSUser.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqGAINSUser.waitingReply[corrID];
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

        console.log('connecting to: ' + smqGAINSUser.rabbitEndpoint + ', using ' + username + '/' + password);
        smqGAINSUser.client.connect(smqGAINSUser.username, smqGAINSUser.password, on_connect, on_error, smqGAINSUser.virtualHost);
    };

    smqGAINSUser.disconnect = function() {
        if (smqGAINSUser && smqGAINSUser.client) 
        {
            smqGAINSUser.client.disconnect();
        }
    }

    smqGAINSUser.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqGAINSUser.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqGAINSUser.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqGAINSUser.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSUser.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSUser.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSUser.Ping = function() {
            smqGAINSUser.Ping('{}');
        }

        smqGAINSUser.Ping = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.MyRoles = function() {
            smqGAINSUser.MyRoles('{}');
        }

        smqGAINSUser.MyRoles = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetAssetCountsByWorkflow = function() {
            smqGAINSUser.GetAssetCountsByWorkflow('{}');
        }

        smqGAINSUser.GetAssetCountsByWorkflow = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetGamingLocations = function() {
            smqGAINSUser.GetGamingLocations('{}');
        }

        smqGAINSUser.GetGamingLocations = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetRelevantActions = function() {
            smqGAINSUser.GetRelevantActions('{}');
        }

        smqGAINSUser.GetRelevantActions = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetVersion = function() {
            smqGAINSUser.GetVersion('{}');
        }

        smqGAINSUser.GetVersion = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetAssetStatuses = function() {
            smqGAINSUser.GetAssetStatuses('{}');
        }

        smqGAINSUser.GetAssetStatuses = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetAssetsByStatus = function() {
            smqGAINSUser.GetAssetsByStatus('{}');
        }

        smqGAINSUser.GetAssetsByStatus = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetFilteredAssetList = function() {
            smqGAINSUser.GetFilteredAssetList('{}');
        }

        smqGAINSUser.GetFilteredAssetList = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetProjects = function() {
            smqGAINSUser.GetProjects('{}');
        }

        smqGAINSUser.GetProjects = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.UpdateProject = function() {
            smqGAINSUser.UpdateProject('{}');
        }

        smqGAINSUser.UpdateProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.AddProject = function() {
            smqGAINSUser.AddProject('{}');
        }

        smqGAINSUser.AddProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetProjectBanks = function() {
            smqGAINSUser.GetProjectBanks('{}');
        }

        smqGAINSUser.GetProjectBanks = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.AddProjectAsset = function() {
            smqGAINSUser.AddProjectAsset('{}');
        }

        smqGAINSUser.AddProjectAsset = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.RemoveProjectAsset = function() {
            smqGAINSUser.RemoveProjectAsset('{}');
        }

        smqGAINSUser.RemoveProjectAsset = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.SearchBJTables = function() {
            smqGAINSUser.SearchBJTables('{}');
        }

        smqGAINSUser.SearchBJTables = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.SearchATRs = function() {
            smqGAINSUser.SearchATRs('{}');
        }

        smqGAINSUser.SearchATRs = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.SearchStoredSlots = function() {
            smqGAINSUser.SearchStoredSlots('{}');
        }

        smqGAINSUser.SearchStoredSlots = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.SearchOnFloorSlots = function() {
            smqGAINSUser.SearchOnFloorSlots('{}');
        }

        smqGAINSUser.SearchOnFloorSlots = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.SearchShuffleMasters = function() {
            smqGAINSUser.SearchShuffleMasters('{}');
        }

        smqGAINSUser.SearchShuffleMasters = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.UpdateProjectBanks = function() {
            smqGAINSUser.UpdateProjectBanks('{}');
        }

        smqGAINSUser.UpdateProjectBanks = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.DeleteProject = function() {
            smqGAINSUser.DeleteProject('{}');
        }

        smqGAINSUser.DeleteProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.CompleteProject = function() {
            smqGAINSUser.CompleteProject('{}');
        }

        smqGAINSUser.CompleteProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetCompletedProjects = function() {
            smqGAINSUser.GetCompletedProjects('{}');
        }

        smqGAINSUser.GetCompletedProjects = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetSlotProjects = function() {
            smqGAINSUser.GetSlotProjects('{}');
        }

        smqGAINSUser.GetSlotProjects = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetSlotProject = function() {
            smqGAINSUser.GetSlotProject('{}');
        }

        smqGAINSUser.GetSlotProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.CreateSlotProject = function() {
            smqGAINSUser.CreateSlotProject('{}');
        }

        smqGAINSUser.CreateSlotProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.AddSlotToProject = function() {
            smqGAINSUser.AddSlotToProject('{}');
        }

        smqGAINSUser.AddSlotToProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.RemoveSlotFromProject = function() {
            smqGAINSUser.RemoveSlotFromProject('{}');
        }

        smqGAINSUser.RemoveSlotFromProject = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetAllPeople = function() {
            smqGAINSUser.GetAllPeople('{}');
        }

        smqGAINSUser.GetAllPeople = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GetSlotViewDetails = function() {
            smqGAINSUser.GetSlotViewDetails('{}');
        }

        smqGAINSUser.GetSlotViewDetails = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqGAINSUser.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqGAINSUser.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSUser.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSUser.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSUser.GuestPing = function() {
            smqGAINSUser.GuestPing('{}');
        }

        smqGAINSUser.GuestPing = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqGAINSUser.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSUser.GuestLogin = function() {
            smqGAINSUser.GuestLogin('{}');
        }

        smqGAINSUser.GuestLogin = function(payload) {
            payload = smqGAINSUser.stringifyValue(payload);
            var id = smqGAINSUser.createUUID();
            var deferred = smqGAINSUser.waitingReply[id] = smqGAINSUser.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqGAINSUser.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSUser.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqGAINSUser;
}

                    