function generateGAINSApiActor() {
    var smqGAINSApi = {
    };
    
    smqGAINSApi.defer = function() {
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

    smqGAINSApi.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqGAINSApi.showPingPongs = true` to get verbose logging.');
        smqGAINSApi.virtualHost = virtualHost;
        smqGAINSApi.username = username;
        smqGAINSApi.password = password;
        smqGAINSApi.rabbitEndpoint = smqGAINSApi.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqGAINSApi.GAINSApi_all_connection = {};
        smqGAINSApi.messages = [];
        smqGAINSApi.waitingReply = [];
        
        smqGAINSApi.client = window.Stomp.client(smqGAINSApi.rabbitEndpoint);

        smqGAINSApi.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqGAINSApi.showPingPongs) return;
            else {
                if (m == "<<< ") m = "";
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
                console.log('CREATED: ' + this.createdAt + ' - ', m, data || p); 
            }
        }

        smqGAINSApi.checkMessage = function(msg) {
            
                // Can also hear what 'GAINSCoordinator' can hear.
                
                if (smqGAINSApi.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqGAINSApi.onGuestPing(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqGAINSApi.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqGAINSApi.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqGAINSApi.onGuestLogin(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqGAINSApi.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqGAINSApi.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqGAINSApi.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqGAINSApi.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqGAINSApi.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqGAINSApi.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqGAINSApi.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqGAINSApi.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqGAINSApi.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqGAINSApi.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqGAINSApi.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqGAINSApi.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqGAINSApi.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqGAINSApi.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqGAINSApi.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqGAINSApi.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqGAINSApi.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqGAINSApi.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqGAINSApi.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqGAINSApi.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqGAINSApi.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqGAINSApi.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqGAINSApi.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqGAINSApi.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqGAINSApi.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqGAINSApi.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqGAINSApi.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqGAINSApi.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqGAINSApi.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqGAINSApi.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqGAINSApi.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqGAINSApi.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqGAINSApi.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqGAINSApi.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqGAINSApi.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqGAINSApi.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqGAINSApi.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqGAINSApi.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqGAINSApi.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqGAINSApi.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqGAINSApi.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqGAINSApi.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqGAINSApi.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqGAINSApi.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqGAINSApi.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqGAINSApi.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqGAINSApi.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetAllPeople) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getallpeople'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetAllPeople(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqGAINSApi.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqGAINSApi.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqGAINSApi.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqGAINSApi.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqGAINSApi.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqGAINSApi.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqGAINSApi.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqGAINSApi.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqGAINSApi.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqGAINSApi.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqGAINSApi.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqGAINSApi.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqGAINSApi.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqGAINSApi.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqGAINSApi.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqGAINSApi.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqGAINSApi.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqGAINSApi.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetSlotViewDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getslotviewdetails'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetSlotViewDetails(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGamingAgentPreventativeMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord'))) {
                        var rpayload = smqGAINSApi.onGamingAgentPreventativeMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetPersonByBadgeNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getpersonbybadgenumber'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetPersonByBadgeNumber(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserValidateNewSealNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.validatenewsealnumber'))) {
                        var rpayload = smqGAINSApi.onGAINSUserValidateNewSealNumber(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchGameName) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchgamename'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchGameName(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserSearchProgressiveDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchprogressivedef'))) {
                        var rpayload = smqGAINSApi.onGAINSUserSearchProgressiveDef(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCompleteConversionMLC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionmlc'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCompleteConversionMLC(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCompleteConversionLSC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionlsc'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCompleteConversionLSC(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminCompleteMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completemovetostorage'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminCompleteMoveToStorage(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getinstalledcomponents'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onSlotRepairAdminGetComponentById) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getcomponentbyid'))) {
                        var rpayload = smqGAINSApi.onSlotRepairAdminGetComponentById(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSApi.onGAINSUserGetConversionDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getconversiondetails'))) {
                        var rpayload = smqGAINSApi.onGAINSUserGetConversionDetails(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqGAINSApi.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqGAINSApi.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqGAINSApi.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqGAINSApi.GAINSApi_all_connection = smqGAINSApi.client.subscribe("/exchange/gainsapi.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqGAINSApi.messages.push(d);
                        smqGAINSApi.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqGAINSApi.showPingPongs) console.log('      --------  MESSAGE FOR smqGAINSApi: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqGAINSApi.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqGAINSApi.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqGAINSApi.waitingReply[corrID];
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

        console.log('connecting to: ' + smqGAINSApi.rabbitEndpoint + ', using ' + username + '/' + password);
        smqGAINSApi.client.connect(smqGAINSApi.username, smqGAINSApi.password, on_connect, on_error, smqGAINSApi.virtualHost);
    };

    smqGAINSApi.disconnect = function() {
        if (smqGAINSApi && smqGAINSApi.client) 
        {
            smqGAINSApi.client.disconnect();
        }
    }

    smqGAINSApi.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqGAINSApi.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqGAINSApi.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.AccessToken = function() {
            smqGAINSApi.AccessToken('{}');
        }

        smqGAINSApi.AccessToken = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSApi.showPingPongs) console.log('Access Token - A Gains API provides an access token to the coordinator');
            smqGAINSApi.client.send('/exchange/gainsapimic/gainscoordinator.account.gainsapi.accesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSCoordinator' can say.
            
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.GAINSCoordinatorAnnouncement = function() {
            smqGAINSApi.GAINSCoordinatorAnnouncement('{}');
        }

        smqGAINSApi.GAINSCoordinatorAnnouncement = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqGAINSApi.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.GamingAgentPing = function() {
            smqGAINSApi.GamingAgentPing('{}');
        }

        smqGAINSApi.GamingAgentPing = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentScheduleBJTournament = function() {
            smqGAINSApi.GamingAgentScheduleBJTournament('{}');
        }

        smqGAINSApi.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentCompleteTableAdd = function() {
            smqGAINSApi.GamingAgentCompleteTableAdd('{}');
        }

        smqGAINSApi.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentActivateTournament = function() {
            smqGAINSApi.GamingAgentActivateTournament('{}');
        }

        smqGAINSApi.GamingAgentActivateTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentScheduleTableModification = function() {
            smqGAINSApi.GamingAgentScheduleTableModification('{}');
        }

        smqGAINSApi.GamingAgentScheduleTableModification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentScheduleTableRemoval = function() {
            smqGAINSApi.GamingAgentScheduleTableRemoval('{}');
        }

        smqGAINSApi.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentEndTournament = function() {
            smqGAINSApi.GamingAgentEndTournament('{}');
        }

        smqGAINSApi.GamingAgentEndTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentCompleteTableRemoval = function() {
            smqGAINSApi.GamingAgentCompleteTableRemoval('{}');
        }

        smqGAINSApi.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentTableAddNotification = function() {
            smqGAINSApi.GamingAgentTableAddNotification('{}');
        }

        smqGAINSApi.GamingAgentTableAddNotification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentTableGamesFeltChecklist = function() {
            smqGAINSApi.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqGAINSApi.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentShuffleMasterVerification = function() {
            smqGAINSApi.GamingAgentShuffleMasterVerification('{}');
        }

        smqGAINSApi.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRelicensingSearch = function() {
            smqGAINSApi.GamingAgentRelicensingSearch('{}');
        }

        smqGAINSApi.GamingAgentRelicensingSearch = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRelicense = function() {
            smqGAINSApi.GamingAgentRelicense('{}');
        }

        smqGAINSApi.GamingAgentRelicense = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentGetRelicensesToRecheck = function() {
            smqGAINSApi.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqGAINSApi.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentUnlicense = function() {
            smqGAINSApi.GamingAgentUnlicense('{}');
        }

        smqGAINSApi.GamingAgentUnlicense = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentResolveRecheck = function() {
            smqGAINSApi.GamingAgentResolveRecheck('{}');
        }

        smqGAINSApi.GamingAgentResolveRecheck = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentGetGCInspectionRequiredList = function() {
            smqGAINSApi.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqGAINSApi.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentGetFeltReviewList = function() {
            smqGAINSApi.GamingAgentGetFeltReviewList('{}');
        }

        smqGAINSApi.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentCompleteApplyLicense = function() {
            smqGAINSApi.GamingAgentCompleteApplyLicense('{}');
        }

        smqGAINSApi.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentCompleteRemoval = function() {
            smqGAINSApi.GamingAgentCompleteRemoval('{}');
        }

        smqGAINSApi.GamingAgentCompleteRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentEditScheduledRemoval = function() {
            smqGAINSApi.GamingAgentEditScheduledRemoval('{}');
        }

        smqGAINSApi.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentEditSealGC = function() {
            smqGAINSApi.GamingAgentEditSealGC('{}');
        }

        smqGAINSApi.GamingAgentEditSealGC = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentEditSealsFloor = function() {
            smqGAINSApi.GamingAgentEditSealsFloor('{}');
        }

        smqGAINSApi.GamingAgentEditSealsFloor = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentEmergencyDropInspection = function() {
            smqGAINSApi.GamingAgentEmergencyDropInspection('{}');
        }

        smqGAINSApi.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentGCInspection = function() {
            smqGAINSApi.GamingAgentGCInspection('{}');
        }

        smqGAINSApi.GamingAgentGCInspection = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentJPVerify100K = function() {
            smqGAINSApi.GamingAgentJPVerify100K('{}');
        }

        smqGAINSApi.GamingAgentJPVerify100K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentJPVerify10K = function() {
            smqGAINSApi.GamingAgentJPVerify10K('{}');
        }

        smqGAINSApi.GamingAgentJPVerify10K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentJPVerify20K = function() {
            smqGAINSApi.GamingAgentJPVerify20K('{}');
        }

        smqGAINSApi.GamingAgentJPVerify20K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentJPVerify50K = function() {
            smqGAINSApi.GamingAgentJPVerify50K('{}');
        }

        smqGAINSApi.GamingAgentJPVerify50K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentMediaVerification = function() {
            smqGAINSApi.GamingAgentMediaVerification('{}');
        }

        smqGAINSApi.GamingAgentMediaVerification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRamClearPerform = function() {
            smqGAINSApi.GamingAgentRamClearPerform('{}');
        }

        smqGAINSApi.GamingAgentRamClearPerform = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentStackerFullRecord = function() {
            smqGAINSApi.GamingAgentStackerFullRecord('{}');
        }

        smqGAINSApi.GamingAgentStackerFullRecord = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentStateOfMinnesotaInspection = function() {
            smqGAINSApi.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqGAINSApi.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentCompleteConversionFloorAdv = function() {
            smqGAINSApi.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqGAINSApi.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRamClearConversion = function() {
            smqGAINSApi.GamingAgentRamClearConversion('{}');
        }

        smqGAINSApi.GamingAgentRamClearConversion = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRamClearToInspect = function() {
            smqGAINSApi.GamingAgentRamClearToInspect('{}');
        }

        smqGAINSApi.GamingAgentRamClearToInspect = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRamClearToActive = function() {
            smqGAINSApi.GamingAgentRamClearToActive('{}');
        }

        smqGAINSApi.GamingAgentRamClearToActive = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentRequestActivation = function() {
            smqGAINSApi.GamingAgentRequestActivation('{}');
        }

        smqGAINSApi.GamingAgentRequestActivation = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentSuspendedJPReverify100K = function() {
            smqGAINSApi.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqGAINSApi.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentSuspendedJPReverify10K = function() {
            smqGAINSApi.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqGAINSApi.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentSuspendedJPReverify20K = function() {
            smqGAINSApi.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqGAINSApi.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentSuspendedJPReverify50K = function() {
            smqGAINSApi.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqGAINSApi.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GamingAgentPreventativeMaintenanceRecord = function() {
            smqGAINSApi.GamingAgentPreventativeMaintenanceRecord('{}');
        }

        smqGAINSApi.GamingAgentPreventativeMaintenanceRecord = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGamingAgent.showPingPongs) console.log('Preventative Maintenance Record - ');
            smqGAINSApi.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.BJFeltLogPing = function() {
            smqGAINSApi.BJFeltLogPing('{}');
        }

        smqGAINSApi.BJFeltLogPing = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogUpdateTableInfo = function() {
            smqGAINSApi.BJFeltLogUpdateTableInfo('{}');
        }

        smqGAINSApi.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogCompleteTableModification = function() {
            smqGAINSApi.BJFeltLogCompleteTableModification('{}');
        }

        smqGAINSApi.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogEndTournament = function() {
            smqGAINSApi.BJFeltLogEndTournament('{}');
        }

        smqGAINSApi.BJFeltLogEndTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogScheduleTableRemoval = function() {
            smqGAINSApi.BJFeltLogScheduleTableRemoval('{}');
        }

        smqGAINSApi.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogServiceShuffleMaster = function() {
            smqGAINSApi.BJFeltLogServiceShuffleMaster('{}');
        }

        smqGAINSApi.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogScheduleBJTournament = function() {
            smqGAINSApi.BJFeltLogScheduleBJTournament('{}');
        }

        smqGAINSApi.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogReceiveShuffleMaster = function() {
            smqGAINSApi.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqGAINSApi.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogTableAddNotification = function() {
            smqGAINSApi.BJFeltLogTableAddNotification('{}');
        }

        smqGAINSApi.BJFeltLogTableAddNotification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogActivateTournament = function() {
            smqGAINSApi.BJFeltLogActivateTournament('{}');
        }

        smqGAINSApi.BJFeltLogActivateTournament = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogCompleteTableAdd = function() {
            smqGAINSApi.BJFeltLogCompleteTableAdd('{}');
        }

        smqGAINSApi.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogCompleteTableRemoval = function() {
            smqGAINSApi.BJFeltLogCompleteTableRemoval('{}');
        }

        smqGAINSApi.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogScheduleTableModification = function() {
            smqGAINSApi.BJFeltLogScheduleTableModification('{}');
        }

        smqGAINSApi.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogLogFeltChange = function() {
            smqGAINSApi.BJFeltLogLogFeltChange('{}');
        }

        smqGAINSApi.BJFeltLogLogFeltChange = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogGetBlackTables = function() {
            smqGAINSApi.BJFeltLogGetBlackTables('{}');
        }

        smqGAINSApi.BJFeltLogGetBlackTables = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogGetShuffleMasters = function() {
            smqGAINSApi.BJFeltLogGetShuffleMasters('{}');
        }

        smqGAINSApi.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.BJFeltLogGetBlackTableProjects = function() {
            smqGAINSApi.BJFeltLogGetBlackTableProjects('{}');
        }

        smqGAINSApi.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqGAINSApi.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.GAINSUserPing = function() {
            smqGAINSApi.GAINSUserPing('{}');
        }

        smqGAINSApi.GAINSUserPing = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserMyRoles = function() {
            smqGAINSApi.GAINSUserMyRoles('{}');
        }

        smqGAINSApi.GAINSUserMyRoles = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetAssetCountsByWorkflow = function() {
            smqGAINSApi.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqGAINSApi.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetGamingLocations = function() {
            smqGAINSApi.GAINSUserGetGamingLocations('{}');
        }

        smqGAINSApi.GAINSUserGetGamingLocations = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetRelevantActions = function() {
            smqGAINSApi.GAINSUserGetRelevantActions('{}');
        }

        smqGAINSApi.GAINSUserGetRelevantActions = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetVersion = function() {
            smqGAINSApi.GAINSUserGetVersion('{}');
        }

        smqGAINSApi.GAINSUserGetVersion = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetAssetStatuses = function() {
            smqGAINSApi.GAINSUserGetAssetStatuses('{}');
        }

        smqGAINSApi.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetAssetsByStatus = function() {
            smqGAINSApi.GAINSUserGetAssetsByStatus('{}');
        }

        smqGAINSApi.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetFilteredAssetList = function() {
            smqGAINSApi.GAINSUserGetFilteredAssetList('{}');
        }

        smqGAINSApi.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetProjects = function() {
            smqGAINSApi.GAINSUserGetProjects('{}');
        }

        smqGAINSApi.GAINSUserGetProjects = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserUpdateProject = function() {
            smqGAINSApi.GAINSUserUpdateProject('{}');
        }

        smqGAINSApi.GAINSUserUpdateProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserAddProject = function() {
            smqGAINSApi.GAINSUserAddProject('{}');
        }

        smqGAINSApi.GAINSUserAddProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetProjectBanks = function() {
            smqGAINSApi.GAINSUserGetProjectBanks('{}');
        }

        smqGAINSApi.GAINSUserGetProjectBanks = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserAddProjectAsset = function() {
            smqGAINSApi.GAINSUserAddProjectAsset('{}');
        }

        smqGAINSApi.GAINSUserAddProjectAsset = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserRemoveProjectAsset = function() {
            smqGAINSApi.GAINSUserRemoveProjectAsset('{}');
        }

        smqGAINSApi.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchBJTables = function() {
            smqGAINSApi.GAINSUserSearchBJTables('{}');
        }

        smqGAINSApi.GAINSUserSearchBJTables = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchATRs = function() {
            smqGAINSApi.GAINSUserSearchATRs('{}');
        }

        smqGAINSApi.GAINSUserSearchATRs = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchStoredSlots = function() {
            smqGAINSApi.GAINSUserSearchStoredSlots('{}');
        }

        smqGAINSApi.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchOnFloorSlots = function() {
            smqGAINSApi.GAINSUserSearchOnFloorSlots('{}');
        }

        smqGAINSApi.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchShuffleMasters = function() {
            smqGAINSApi.GAINSUserSearchShuffleMasters('{}');
        }

        smqGAINSApi.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserUpdateProjectBanks = function() {
            smqGAINSApi.GAINSUserUpdateProjectBanks('{}');
        }

        smqGAINSApi.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserDeleteProject = function() {
            smqGAINSApi.GAINSUserDeleteProject('{}');
        }

        smqGAINSApi.GAINSUserDeleteProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserCompleteProject = function() {
            smqGAINSApi.GAINSUserCompleteProject('{}');
        }

        smqGAINSApi.GAINSUserCompleteProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetCompletedProjects = function() {
            smqGAINSApi.GAINSUserGetCompletedProjects('{}');
        }

        smqGAINSApi.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetSlotProjects = function() {
            smqGAINSApi.GAINSUserGetSlotProjects('{}');
        }

        smqGAINSApi.GAINSUserGetSlotProjects = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetSlotProject = function() {
            smqGAINSApi.GAINSUserGetSlotProject('{}');
        }

        smqGAINSApi.GAINSUserGetSlotProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserCreateSlotProject = function() {
            smqGAINSApi.GAINSUserCreateSlotProject('{}');
        }

        smqGAINSApi.GAINSUserCreateSlotProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserAddSlotToProject = function() {
            smqGAINSApi.GAINSUserAddSlotToProject('{}');
        }

        smqGAINSApi.GAINSUserAddSlotToProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserRemoveSlotFromProject = function() {
            smqGAINSApi.GAINSUserRemoveSlotFromProject('{}');
        }

        smqGAINSApi.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetAllPeople = function() {
            smqGAINSApi.GAINSUserGetAllPeople('{}');
        }

        smqGAINSApi.GAINSUserGetAllPeople = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetSlotViewDetails = function() {
            smqGAINSApi.GAINSUserGetSlotViewDetails('{}');
        }

        smqGAINSApi.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetPersonByBadgeNumber = function() {
            smqGAINSApi.GAINSUserGetPersonByBadgeNumber('{}');
        }

        smqGAINSApi.GAINSUserGetPersonByBadgeNumber = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Person By Badge Number - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getpersonbybadgenumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserValidateNewSealNumber = function() {
            smqGAINSApi.GAINSUserValidateNewSealNumber('{}');
        }

        smqGAINSApi.GAINSUserValidateNewSealNumber = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Validate New Seal Number - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.validatenewsealnumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchGameName = function() {
            smqGAINSApi.GAINSUserSearchGameName('{}');
        }

        smqGAINSApi.GAINSUserSearchGameName = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Game Name - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchgamename', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserSearchProgressiveDef = function() {
            smqGAINSApi.GAINSUserSearchProgressiveDef('{}');
        }

        smqGAINSApi.GAINSUserSearchProgressiveDef = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Progressive Def - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchprogressivedef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GAINSUserGetConversionDetails = function() {
            smqGAINSApi.GAINSUserGetConversionDetails('{}');
        }

        smqGAINSApi.GAINSUserGetConversionDetails = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Conversion Details - ');
            smqGAINSApi.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getconversiondetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqGAINSApi.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSApi.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSApi.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSApi.GuestPing = function() {
            smqGAINSApi.GuestPing('{}');
        }

        smqGAINSApi.GuestPing = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqGAINSApi.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSApi.GuestLogin = function() {
            smqGAINSApi.GuestLogin('{}');
        }

        smqGAINSApi.GuestLogin = function(payload) {
            payload = smqGAINSApi.stringifyValue(payload);
            var id = smqGAINSApi.createUUID();
            var deferred = smqGAINSApi.waitingReply[id] = smqGAINSApi.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqGAINSApi.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSApi.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqGAINSApi;
}

                    