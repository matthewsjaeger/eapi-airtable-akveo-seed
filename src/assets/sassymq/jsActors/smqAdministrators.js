function generateAdministratorsActor() {
    var smqAdministrators = {
    };
    
    smqAdministrators.defer = function() {
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

    smqAdministrators.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqAdministrators.showPingPongs = true` to get verbose logging.');
        smqAdministrators.virtualHost = virtualHost;
        smqAdministrators.username = username;
        smqAdministrators.password = password;
        smqAdministrators.rabbitEndpoint = smqAdministrators.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqAdministrators.Administrators_all_connection = {};
        smqAdministrators.messages = [];
        smqAdministrators.waitingReply = [];
        
        smqAdministrators.client = window.Stomp.client(smqAdministrators.rabbitEndpoint);

        smqAdministrators.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqAdministrators.showPingPongs) return;
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

        smqAdministrators.checkMessage = function(msg) {
            
                // Can also hear what 'AuditAgent' can hear.
                
                // Can also hear what 'SlotRepairAdmin' can hear.
                
                // Can also hear what 'ATR' can hear.
                
                // Can also hear what 'GAINSApi' can hear.
                
                // Can also hear what 'GAINSCoordinator' can hear.
                
                if (smqAdministrators.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqAdministrators.onGuestPing(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqAdministrators.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqAdministrators.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqAdministrators.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqAdministrators.onGuestLogin(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqAdministrators.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqAdministrators.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqAdministrators.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqAdministrators.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqAdministrators.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqAdministrators.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqAdministrators.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqAdministrators.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqAdministrators.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqAdministrators.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqAdministrators.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqAdministrators.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqAdministrators.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqAdministrators.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqAdministrators.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqAdministrators.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqAdministrators.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqAdministrators.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqAdministrators.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqAdministrators.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqAdministrators.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqAdministrators.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqAdministrators.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqAdministrators.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqAdministrators.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqAdministrators.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqAdministrators.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqAdministrators.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqAdministrators.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqAdministrators.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqAdministrators.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqAdministrators.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqAdministrators.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqAdministrators.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqAdministrators.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqAdministrators.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqAdministrators.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqAdministrators.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqAdministrators.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqAdministrators.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqAdministrators.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqAdministrators.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqAdministrators.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqAdministrators.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqAdministrators.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqAdministrators.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqAdministrators.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqAdministrators.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqAdministrators.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqAdministrators.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqAdministrators.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqAdministrators.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqAdministrators.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqAdministrators.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqAdministrators.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqAdministrators.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqAdministrators.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqAdministrators.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqAdministrators.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqAdministrators.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqAdministrators.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqAdministrators.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqAdministrators.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqAdministrators.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetAllPeople) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getallpeople'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetAllPeople(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqAdministrators.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqAdministrators.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqAdministrators.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqAdministrators.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqAdministrators.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqAdministrators.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqAdministrators.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqAdministrators.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqAdministrators.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqAdministrators.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqAdministrators.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqAdministrators.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqAdministrators.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqAdministrators.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqAdministrators.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqAdministrators.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqAdministrators.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqAdministrators.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqAdministrators.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqAdministrators.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqAdministrators.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqAdministrators.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqAdministrators.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqAdministrators.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqAdministrators.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqAdministrators.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqAdministrators.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqAdministrators.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqAdministrators.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetSlotViewDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getslotviewdetails'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetSlotViewDetails(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGamingAgentPreventativeMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord'))) {
                        var rpayload = smqAdministrators.onGamingAgentPreventativeMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetPersonByBadgeNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getpersonbybadgenumber'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetPersonByBadgeNumber(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserValidateNewSealNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.validatenewsealnumber'))) {
                        var rpayload = smqAdministrators.onGAINSUserValidateNewSealNumber(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchGameName) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchgamename'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchGameName(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserSearchProgressiveDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchprogressivedef'))) {
                        var rpayload = smqAdministrators.onGAINSUserSearchProgressiveDef(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCompleteConversionMLC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionmlc'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCompleteConversionMLC(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCompleteConversionLSC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionlsc'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCompleteConversionLSC(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminCompleteMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completemovetostorage'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminCompleteMoveToStorage(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getinstalledcomponents'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onSlotRepairAdminGetComponentById) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getcomponentbyid'))) {
                        var rpayload = smqAdministrators.onSlotRepairAdminGetComponentById(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAdministrators.onGAINSUserGetConversionDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getconversiondetails'))) {
                        var rpayload = smqAdministrators.onGAINSUserGetConversionDetails(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqAdministrators.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqAdministrators.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqAdministrators.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqAdministrators.Administrators_all_connection = smqAdministrators.client.subscribe("/exchange/administrators.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqAdministrators.messages.push(d);
                        smqAdministrators.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqAdministrators.showPingPongs) console.log('      --------  MESSAGE FOR smqAdministrators: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqAdministrators.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqAdministrators.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqAdministrators.waitingReply[corrID];
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

        console.log('connecting to: ' + smqAdministrators.rabbitEndpoint + ', using ' + username + '/' + password);
        smqAdministrators.client.connect(smqAdministrators.username, smqAdministrators.password, on_connect, on_error, smqAdministrators.virtualHost);
    };

    smqAdministrators.disconnect = function() {
        if (smqAdministrators && smqAdministrators.client) 
        {
            smqAdministrators.client.disconnect();
        }
    }

    smqAdministrators.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqAdministrators.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqAdministrators.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.ForensicFieldChecklist = function() {
            smqAdministrators.ForensicFieldChecklist('{}');
        }

        smqAdministrators.ForensicFieldChecklist = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqAdministrators.showPingPongs) console.log('Forensic Field Checklist - ');
            smqAdministrators.client.send('/exchange/administratorsmic/gainscoordinator.onfloor.administrators.forensicfieldchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.StackerFullNotification = function() {
            smqAdministrators.StackerFullNotification('{}');
        }

        smqAdministrators.StackerFullNotification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqAdministrators.showPingPongs) console.log('Stacker Full Notification - ');
            smqAdministrators.client.send('/exchange/administratorsmic/gainscoordinator.onfloor.administrators.stackerfullnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.CompleteConversionFloor = function() {
            smqAdministrators.CompleteConversionFloor('{}');
        }

        smqAdministrators.CompleteConversionFloor = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqAdministrators.showPingPongs) console.log('Complete Conversion Floor - ');
            smqAdministrators.client.send('/exchange/administratorsmic/gainscoordinator.onfloor.administrators.completeconversionfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'AuditAgent' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.AuditAgentATRInspection = function() {
            smqAdministrators.AuditAgentATRInspection('{}');
        }

        smqAdministrators.AuditAgentATRInspection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqAuditAgent.showPingPongs) console.log('A T R Inspection - ');
            smqAdministrators.client.send('/exchange/auditagentmic/gainscoordinator.storage.auditagent.atrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'SlotRepairAdmin' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.SlotRepairAdminScheduleSale = function() {
            smqAdministrators.SlotRepairAdminScheduleSale('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleSale = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Sale - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulesale', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminDesignateToMuseum = function() {
            smqAdministrators.SlotRepairAdminDesignateToMuseum('{}');
        }

        smqAdministrators.SlotRepairAdminDesignateToMuseum = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Designate To Museum - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.designatetomuseum', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminEditSeals = function() {
            smqAdministrators.SlotRepairAdminEditSeals('{}');
        }

        smqAdministrators.SlotRepairAdminEditSeals = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editseals', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleDestruction = function() {
            smqAdministrators.SlotRepairAdminScheduleDestruction('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleDestruction = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Destruction - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.scheduledestruction', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleReturn = function() {
            smqAdministrators.SlotRepairAdminScheduleReturn('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleReturn = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Return - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulereturn', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleStorageToFloor = function() {
            smqAdministrators.SlotRepairAdminScheduleStorageToFloor('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleStorageToFloor = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCancelScheduledEvent = function() {
            smqAdministrators.SlotRepairAdminCancelScheduledEvent('{}');
        }

        smqAdministrators.SlotRepairAdminCancelScheduledEvent = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.cancelscheduledevent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCompleteConversion = function() {
            smqAdministrators.SlotRepairAdminCompleteConversion('{}');
        }

        smqAdministrators.SlotRepairAdminCompleteConversion = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.completeconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminEditConversion = function() {
            smqAdministrators.SlotRepairAdminEditConversion('{}');
        }

        smqAdministrators.SlotRepairAdminEditConversion = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCancelScheduledEventFloor = function() {
            smqAdministrators.SlotRepairAdminCancelScheduledEventFloor('{}');
        }

        smqAdministrators.SlotRepairAdminCancelScheduledEventFloor = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event Floor - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminEditSealsAdmin = function() {
            smqAdministrators.SlotRepairAdminEditSealsAdmin('{}');
        }

        smqAdministrators.SlotRepairAdminEditSealsAdmin = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals Admin - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editsealsadmin', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminQuickCorrection = function() {
            smqAdministrators.SlotRepairAdminQuickCorrection('{}');
        }

        smqAdministrators.SlotRepairAdminQuickCorrection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Quick Correction - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.quickcorrection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleConversionAdv = function() {
            smqAdministrators.SlotRepairAdminScheduleConversionAdv('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleConversionAdv = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Adv - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleMoveToStorage = function() {
            smqAdministrators.SlotRepairAdminScheduleMoveToStorage('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleMoveToStorage = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminScheduleTournament = function() {
            smqAdministrators.SlotRepairAdminScheduleTournament('{}');
        }

        smqAdministrators.SlotRepairAdminScheduleTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Tournament - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduletournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminUpdateActiveSlot = function() {
            smqAdministrators.SlotRepairAdminUpdateActiveSlot('{}');
        }

        smqAdministrators.SlotRepairAdminUpdateActiveSlot = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Update Active Slot - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.updateactiveslot', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminEditConversionFloor = function() {
            smqAdministrators.SlotRepairAdminEditConversionFloor('{}');
        }

        smqAdministrators.SlotRepairAdminEditConversionFloor = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion Floor - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editconversionfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminDeactivateTournamentMode = function() {
            smqAdministrators.SlotRepairAdminDeactivateTournamentMode('{}');
        }

        smqAdministrators.SlotRepairAdminDeactivateTournamentMode = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Deactivate Tournament Mode - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminActivateTournamentMode = function() {
            smqAdministrators.SlotRepairAdminActivateTournamentMode('{}');
        }

        smqAdministrators.SlotRepairAdminActivateTournamentMode = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Activate Tournament Mode - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCompleteConversionMLC = function() {
            smqAdministrators.SlotRepairAdminCompleteConversionMLC('{}');
        }

        smqAdministrators.SlotRepairAdminCompleteConversionMLC = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion M L C - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completeconversionmlc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCompleteConversionLSC = function() {
            smqAdministrators.SlotRepairAdminCompleteConversionLSC('{}');
        }

        smqAdministrators.SlotRepairAdminCompleteConversionLSC = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion L S C - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completeconversionlsc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminCompleteMoveToStorage = function() {
            smqAdministrators.SlotRepairAdminCompleteMoveToStorage('{}');
        }

        smqAdministrators.SlotRepairAdminCompleteMoveToStorage = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Move To Storage - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completemovetostorage', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminGetInstalledComponents = function() {
            smqAdministrators.SlotRepairAdminGetInstalledComponents('{}');
        }

        smqAdministrators.SlotRepairAdminGetInstalledComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Get Installed Components - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.SlotRepairAdminGetComponentById = function() {
            smqAdministrators.SlotRepairAdminGetComponentById('{}');
        }

        smqAdministrators.SlotRepairAdminGetComponentById = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Get Component By Id - ');
            smqAdministrators.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.getcomponentbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'ATR' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.ATRAdminEditSeal = function() {
            smqAdministrators.ATRAdminEditSeal('{}');
        }

        smqAdministrators.ATRAdminEditSeal = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Admin Edit Seal - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.admineditseal', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRATRMaintenanceRecord = function() {
            smqAdministrators.ATRATRMaintenanceRecord('{}');
        }

        smqAdministrators.ATRATRMaintenanceRecord = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('A T R Maintenance Record - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrmaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRATRServiceRecord = function() {
            smqAdministrators.ATRATRServiceRecord('{}');
        }

        smqAdministrators.ATRATRServiceRecord = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('A T R Service Record - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrservicerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRCancelScheduledATRChange = function() {
            smqAdministrators.ATRCancelScheduledATRChange('{}');
        }

        smqAdministrators.ATRCancelScheduledATRChange = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Cancel Scheduled A T R Change - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.cancelscheduledatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRCompleteATRChange = function() {
            smqAdministrators.ATRCompleteATRChange('{}');
        }

        smqAdministrators.ATRCompleteATRChange = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Complete A T R Change - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.completeatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGCATRInspection = function() {
            smqAdministrators.ATRGCATRInspection('{}');
        }

        smqAdministrators.ATRGCATRInspection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('G C A T R Inspection - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.gcatrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRScheduleATRChange = function() {
            smqAdministrators.ATRScheduleATRChange('{}');
        }

        smqAdministrators.ATRScheduleATRChange = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Schedule A T R Change - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.scheduleatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRVersionCameraUpdate = function() {
            smqAdministrators.ATRVersionCameraUpdate('{}');
        }

        smqAdministrators.ATRVersionCameraUpdate = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Version Camera Update - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.versioncameraupdate', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetComponentList = function() {
            smqAdministrators.ATRGetComponentList('{}');
        }

        smqAdministrators.ATRGetComponentList = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Component List - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcomponentlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetManufacturerList = function() {
            smqAdministrators.ATRGetManufacturerList('{}');
        }

        smqAdministrators.ATRGetManufacturerList = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Manufacturer List - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmanufacturerlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetInstalledComponents = function() {
            smqAdministrators.ATRGetInstalledComponents('{}');
        }

        smqAdministrators.ATRGetInstalledComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Installed Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetCDIDetails = function() {
            smqAdministrators.ATRGetCDIDetails('{}');
        }

        smqAdministrators.ATRGetCDIDetails = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get C D I Details - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcdidetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRSearchInstalledComponents = function() {
            smqAdministrators.ATRSearchInstalledComponents('{}');
        }

        smqAdministrators.ATRSearchInstalledComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Search Installed Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRSearchUnlinkedComponents = function() {
            smqAdministrators.ATRSearchUnlinkedComponents('{}');
        }

        smqAdministrators.ATRSearchUnlinkedComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Search Unlinked Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchunlinkedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRSearchCDIComponents = function() {
            smqAdministrators.ATRSearchCDIComponents('{}');
        }

        smqAdministrators.ATRSearchCDIComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Search C D I Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchcdicomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetMatchingSignatures = function() {
            smqAdministrators.ATRGetMatchingSignatures('{}');
        }

        smqAdministrators.ATRGetMatchingSignatures = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Matching Signatures - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmatchingsignatures', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRLinkComponent = function() {
            smqAdministrators.ATRLinkComponent('{}');
        }

        smqAdministrators.ATRLinkComponent = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Link Component - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.linkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRUnlinkComponent = function() {
            smqAdministrators.ATRUnlinkComponent('{}');
        }

        smqAdministrators.ATRUnlinkComponent = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Unlink Component - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.unlinkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetNewCDIs = function() {
            smqAdministrators.ATRGetNewCDIs('{}');
        }

        smqAdministrators.ATRGetNewCDIs = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get New C D Is - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getnewcdis', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGenerateSlotCompDef = function() {
            smqAdministrators.ATRGenerateSlotCompDef('{}');
        }

        smqAdministrators.ATRGenerateSlotCompDef = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Generate Slot Comp Def - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.generateslotcompdef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetConflictedComponents = function() {
            smqAdministrators.ATRGetConflictedComponents('{}');
        }

        smqAdministrators.ATRGetConflictedComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Conflicted Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getconflictedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRRevokeConflictedComponent = function() {
            smqAdministrators.ATRRevokeConflictedComponent('{}');
        }

        smqAdministrators.ATRRevokeConflictedComponent = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Revoke Conflicted Component - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.revokeconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetSlotDefInstalledComponents = function() {
            smqAdministrators.ATRGetSlotDefInstalledComponents('{}');
        }

        smqAdministrators.ATRGetSlotDefInstalledComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Def Installed Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdefinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRResolveConflictedComponent = function() {
            smqAdministrators.ATRResolveConflictedComponent('{}');
        }

        smqAdministrators.ATRResolveConflictedComponent = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Resolve Conflicted Component - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.resolveconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetSlotDetails = function() {
            smqAdministrators.ATRGetSlotDetails('{}');
        }

        smqAdministrators.ATRGetSlotDetails = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Details - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.ATRGetSharedInstalledComponents = function() {
            smqAdministrators.ATRGetSharedInstalledComponents('{}');
        }

        smqAdministrators.ATRGetSharedInstalledComponents = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqATR.showPingPongs) console.log('Get Shared Installed Components - ');
            smqAdministrators.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getsharedinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSApi' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.GAINSApiAccessToken = function() {
            smqAdministrators.GAINSApiAccessToken('{}');
        }

        smqAdministrators.GAINSApiAccessToken = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSApi.showPingPongs) console.log('Access Token - A Gains API provides an access token to the coordinator');
            smqAdministrators.client.send('/exchange/gainsapimic/gainscoordinator.account.gainsapi.accesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSCoordinator' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.GAINSCoordinatorAnnouncement = function() {
            smqAdministrators.GAINSCoordinatorAnnouncement('{}');
        }

        smqAdministrators.GAINSCoordinatorAnnouncement = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqAdministrators.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.GamingAgentPing = function() {
            smqAdministrators.GamingAgentPing('{}');
        }

        smqAdministrators.GamingAgentPing = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentScheduleBJTournament = function() {
            smqAdministrators.GamingAgentScheduleBJTournament('{}');
        }

        smqAdministrators.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentCompleteTableAdd = function() {
            smqAdministrators.GamingAgentCompleteTableAdd('{}');
        }

        smqAdministrators.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentActivateTournament = function() {
            smqAdministrators.GamingAgentActivateTournament('{}');
        }

        smqAdministrators.GamingAgentActivateTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentScheduleTableModification = function() {
            smqAdministrators.GamingAgentScheduleTableModification('{}');
        }

        smqAdministrators.GamingAgentScheduleTableModification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentScheduleTableRemoval = function() {
            smqAdministrators.GamingAgentScheduleTableRemoval('{}');
        }

        smqAdministrators.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentEndTournament = function() {
            smqAdministrators.GamingAgentEndTournament('{}');
        }

        smqAdministrators.GamingAgentEndTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentCompleteTableRemoval = function() {
            smqAdministrators.GamingAgentCompleteTableRemoval('{}');
        }

        smqAdministrators.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentTableAddNotification = function() {
            smqAdministrators.GamingAgentTableAddNotification('{}');
        }

        smqAdministrators.GamingAgentTableAddNotification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentTableGamesFeltChecklist = function() {
            smqAdministrators.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqAdministrators.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentShuffleMasterVerification = function() {
            smqAdministrators.GamingAgentShuffleMasterVerification('{}');
        }

        smqAdministrators.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRelicensingSearch = function() {
            smqAdministrators.GamingAgentRelicensingSearch('{}');
        }

        smqAdministrators.GamingAgentRelicensingSearch = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRelicense = function() {
            smqAdministrators.GamingAgentRelicense('{}');
        }

        smqAdministrators.GamingAgentRelicense = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentGetRelicensesToRecheck = function() {
            smqAdministrators.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqAdministrators.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentUnlicense = function() {
            smqAdministrators.GamingAgentUnlicense('{}');
        }

        smqAdministrators.GamingAgentUnlicense = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentResolveRecheck = function() {
            smqAdministrators.GamingAgentResolveRecheck('{}');
        }

        smqAdministrators.GamingAgentResolveRecheck = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentGetGCInspectionRequiredList = function() {
            smqAdministrators.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqAdministrators.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentGetFeltReviewList = function() {
            smqAdministrators.GamingAgentGetFeltReviewList('{}');
        }

        smqAdministrators.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentCompleteApplyLicense = function() {
            smqAdministrators.GamingAgentCompleteApplyLicense('{}');
        }

        smqAdministrators.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentCompleteRemoval = function() {
            smqAdministrators.GamingAgentCompleteRemoval('{}');
        }

        smqAdministrators.GamingAgentCompleteRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentEditScheduledRemoval = function() {
            smqAdministrators.GamingAgentEditScheduledRemoval('{}');
        }

        smqAdministrators.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentEditSealGC = function() {
            smqAdministrators.GamingAgentEditSealGC('{}');
        }

        smqAdministrators.GamingAgentEditSealGC = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentEditSealsFloor = function() {
            smqAdministrators.GamingAgentEditSealsFloor('{}');
        }

        smqAdministrators.GamingAgentEditSealsFloor = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentEmergencyDropInspection = function() {
            smqAdministrators.GamingAgentEmergencyDropInspection('{}');
        }

        smqAdministrators.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentGCInspection = function() {
            smqAdministrators.GamingAgentGCInspection('{}');
        }

        smqAdministrators.GamingAgentGCInspection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentJPVerify100K = function() {
            smqAdministrators.GamingAgentJPVerify100K('{}');
        }

        smqAdministrators.GamingAgentJPVerify100K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentJPVerify10K = function() {
            smqAdministrators.GamingAgentJPVerify10K('{}');
        }

        smqAdministrators.GamingAgentJPVerify10K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentJPVerify20K = function() {
            smqAdministrators.GamingAgentJPVerify20K('{}');
        }

        smqAdministrators.GamingAgentJPVerify20K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentJPVerify50K = function() {
            smqAdministrators.GamingAgentJPVerify50K('{}');
        }

        smqAdministrators.GamingAgentJPVerify50K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentMediaVerification = function() {
            smqAdministrators.GamingAgentMediaVerification('{}');
        }

        smqAdministrators.GamingAgentMediaVerification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRamClearPerform = function() {
            smqAdministrators.GamingAgentRamClearPerform('{}');
        }

        smqAdministrators.GamingAgentRamClearPerform = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentStackerFullRecord = function() {
            smqAdministrators.GamingAgentStackerFullRecord('{}');
        }

        smqAdministrators.GamingAgentStackerFullRecord = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentStateOfMinnesotaInspection = function() {
            smqAdministrators.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqAdministrators.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentCompleteConversionFloorAdv = function() {
            smqAdministrators.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqAdministrators.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRamClearConversion = function() {
            smqAdministrators.GamingAgentRamClearConversion('{}');
        }

        smqAdministrators.GamingAgentRamClearConversion = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRamClearToInspect = function() {
            smqAdministrators.GamingAgentRamClearToInspect('{}');
        }

        smqAdministrators.GamingAgentRamClearToInspect = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRamClearToActive = function() {
            smqAdministrators.GamingAgentRamClearToActive('{}');
        }

        smqAdministrators.GamingAgentRamClearToActive = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentRequestActivation = function() {
            smqAdministrators.GamingAgentRequestActivation('{}');
        }

        smqAdministrators.GamingAgentRequestActivation = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentSuspendedJPReverify100K = function() {
            smqAdministrators.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqAdministrators.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentSuspendedJPReverify10K = function() {
            smqAdministrators.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqAdministrators.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentSuspendedJPReverify20K = function() {
            smqAdministrators.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqAdministrators.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentSuspendedJPReverify50K = function() {
            smqAdministrators.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqAdministrators.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GamingAgentPreventativeMaintenanceRecord = function() {
            smqAdministrators.GamingAgentPreventativeMaintenanceRecord('{}');
        }

        smqAdministrators.GamingAgentPreventativeMaintenanceRecord = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGamingAgent.showPingPongs) console.log('Preventative Maintenance Record - ');
            smqAdministrators.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.BJFeltLogPing = function() {
            smqAdministrators.BJFeltLogPing('{}');
        }

        smqAdministrators.BJFeltLogPing = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogUpdateTableInfo = function() {
            smqAdministrators.BJFeltLogUpdateTableInfo('{}');
        }

        smqAdministrators.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogCompleteTableModification = function() {
            smqAdministrators.BJFeltLogCompleteTableModification('{}');
        }

        smqAdministrators.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogEndTournament = function() {
            smqAdministrators.BJFeltLogEndTournament('{}');
        }

        smqAdministrators.BJFeltLogEndTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogScheduleTableRemoval = function() {
            smqAdministrators.BJFeltLogScheduleTableRemoval('{}');
        }

        smqAdministrators.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogServiceShuffleMaster = function() {
            smqAdministrators.BJFeltLogServiceShuffleMaster('{}');
        }

        smqAdministrators.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogScheduleBJTournament = function() {
            smqAdministrators.BJFeltLogScheduleBJTournament('{}');
        }

        smqAdministrators.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogReceiveShuffleMaster = function() {
            smqAdministrators.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqAdministrators.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogTableAddNotification = function() {
            smqAdministrators.BJFeltLogTableAddNotification('{}');
        }

        smqAdministrators.BJFeltLogTableAddNotification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogActivateTournament = function() {
            smqAdministrators.BJFeltLogActivateTournament('{}');
        }

        smqAdministrators.BJFeltLogActivateTournament = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogCompleteTableAdd = function() {
            smqAdministrators.BJFeltLogCompleteTableAdd('{}');
        }

        smqAdministrators.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogCompleteTableRemoval = function() {
            smqAdministrators.BJFeltLogCompleteTableRemoval('{}');
        }

        smqAdministrators.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogScheduleTableModification = function() {
            smqAdministrators.BJFeltLogScheduleTableModification('{}');
        }

        smqAdministrators.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogLogFeltChange = function() {
            smqAdministrators.BJFeltLogLogFeltChange('{}');
        }

        smqAdministrators.BJFeltLogLogFeltChange = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogGetBlackTables = function() {
            smqAdministrators.BJFeltLogGetBlackTables('{}');
        }

        smqAdministrators.BJFeltLogGetBlackTables = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogGetShuffleMasters = function() {
            smqAdministrators.BJFeltLogGetShuffleMasters('{}');
        }

        smqAdministrators.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.BJFeltLogGetBlackTableProjects = function() {
            smqAdministrators.BJFeltLogGetBlackTableProjects('{}');
        }

        smqAdministrators.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqAdministrators.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.GAINSUserPing = function() {
            smqAdministrators.GAINSUserPing('{}');
        }

        smqAdministrators.GAINSUserPing = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserMyRoles = function() {
            smqAdministrators.GAINSUserMyRoles('{}');
        }

        smqAdministrators.GAINSUserMyRoles = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetAssetCountsByWorkflow = function() {
            smqAdministrators.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqAdministrators.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetGamingLocations = function() {
            smqAdministrators.GAINSUserGetGamingLocations('{}');
        }

        smqAdministrators.GAINSUserGetGamingLocations = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetRelevantActions = function() {
            smqAdministrators.GAINSUserGetRelevantActions('{}');
        }

        smqAdministrators.GAINSUserGetRelevantActions = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetVersion = function() {
            smqAdministrators.GAINSUserGetVersion('{}');
        }

        smqAdministrators.GAINSUserGetVersion = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetAssetStatuses = function() {
            smqAdministrators.GAINSUserGetAssetStatuses('{}');
        }

        smqAdministrators.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetAssetsByStatus = function() {
            smqAdministrators.GAINSUserGetAssetsByStatus('{}');
        }

        smqAdministrators.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetFilteredAssetList = function() {
            smqAdministrators.GAINSUserGetFilteredAssetList('{}');
        }

        smqAdministrators.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetProjects = function() {
            smqAdministrators.GAINSUserGetProjects('{}');
        }

        smqAdministrators.GAINSUserGetProjects = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserUpdateProject = function() {
            smqAdministrators.GAINSUserUpdateProject('{}');
        }

        smqAdministrators.GAINSUserUpdateProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserAddProject = function() {
            smqAdministrators.GAINSUserAddProject('{}');
        }

        smqAdministrators.GAINSUserAddProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetProjectBanks = function() {
            smqAdministrators.GAINSUserGetProjectBanks('{}');
        }

        smqAdministrators.GAINSUserGetProjectBanks = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserAddProjectAsset = function() {
            smqAdministrators.GAINSUserAddProjectAsset('{}');
        }

        smqAdministrators.GAINSUserAddProjectAsset = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserRemoveProjectAsset = function() {
            smqAdministrators.GAINSUserRemoveProjectAsset('{}');
        }

        smqAdministrators.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchBJTables = function() {
            smqAdministrators.GAINSUserSearchBJTables('{}');
        }

        smqAdministrators.GAINSUserSearchBJTables = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchATRs = function() {
            smqAdministrators.GAINSUserSearchATRs('{}');
        }

        smqAdministrators.GAINSUserSearchATRs = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchStoredSlots = function() {
            smqAdministrators.GAINSUserSearchStoredSlots('{}');
        }

        smqAdministrators.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchOnFloorSlots = function() {
            smqAdministrators.GAINSUserSearchOnFloorSlots('{}');
        }

        smqAdministrators.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchShuffleMasters = function() {
            smqAdministrators.GAINSUserSearchShuffleMasters('{}');
        }

        smqAdministrators.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserUpdateProjectBanks = function() {
            smqAdministrators.GAINSUserUpdateProjectBanks('{}');
        }

        smqAdministrators.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserDeleteProject = function() {
            smqAdministrators.GAINSUserDeleteProject('{}');
        }

        smqAdministrators.GAINSUserDeleteProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserCompleteProject = function() {
            smqAdministrators.GAINSUserCompleteProject('{}');
        }

        smqAdministrators.GAINSUserCompleteProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetCompletedProjects = function() {
            smqAdministrators.GAINSUserGetCompletedProjects('{}');
        }

        smqAdministrators.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetSlotProjects = function() {
            smqAdministrators.GAINSUserGetSlotProjects('{}');
        }

        smqAdministrators.GAINSUserGetSlotProjects = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetSlotProject = function() {
            smqAdministrators.GAINSUserGetSlotProject('{}');
        }

        smqAdministrators.GAINSUserGetSlotProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserCreateSlotProject = function() {
            smqAdministrators.GAINSUserCreateSlotProject('{}');
        }

        smqAdministrators.GAINSUserCreateSlotProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserAddSlotToProject = function() {
            smqAdministrators.GAINSUserAddSlotToProject('{}');
        }

        smqAdministrators.GAINSUserAddSlotToProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserRemoveSlotFromProject = function() {
            smqAdministrators.GAINSUserRemoveSlotFromProject('{}');
        }

        smqAdministrators.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetAllPeople = function() {
            smqAdministrators.GAINSUserGetAllPeople('{}');
        }

        smqAdministrators.GAINSUserGetAllPeople = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetSlotViewDetails = function() {
            smqAdministrators.GAINSUserGetSlotViewDetails('{}');
        }

        smqAdministrators.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetPersonByBadgeNumber = function() {
            smqAdministrators.GAINSUserGetPersonByBadgeNumber('{}');
        }

        smqAdministrators.GAINSUserGetPersonByBadgeNumber = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Person By Badge Number - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getpersonbybadgenumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserValidateNewSealNumber = function() {
            smqAdministrators.GAINSUserValidateNewSealNumber('{}');
        }

        smqAdministrators.GAINSUserValidateNewSealNumber = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Validate New Seal Number - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.validatenewsealnumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchGameName = function() {
            smqAdministrators.GAINSUserSearchGameName('{}');
        }

        smqAdministrators.GAINSUserSearchGameName = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Game Name - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchgamename', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserSearchProgressiveDef = function() {
            smqAdministrators.GAINSUserSearchProgressiveDef('{}');
        }

        smqAdministrators.GAINSUserSearchProgressiveDef = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Progressive Def - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchprogressivedef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GAINSUserGetConversionDetails = function() {
            smqAdministrators.GAINSUserGetConversionDetails('{}');
        }

        smqAdministrators.GAINSUserGetConversionDetails = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Conversion Details - ');
            smqAdministrators.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getconversiondetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqAdministrators.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAdministrators.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAdministrators.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAdministrators.GuestPing = function() {
            smqAdministrators.GuestPing('{}');
        }

        smqAdministrators.GuestPing = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqAdministrators.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAdministrators.GuestLogin = function() {
            smqAdministrators.GuestLogin('{}');
        }

        smqAdministrators.GuestLogin = function(payload) {
            payload = smqAdministrators.stringifyValue(payload);
            var id = smqAdministrators.createUUID();
            var deferred = smqAdministrators.waitingReply[id] = smqAdministrators.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqAdministrators.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAdministrators.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqAdministrators;
}

                    