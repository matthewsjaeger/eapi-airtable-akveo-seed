

function generateATRActor() {
    var smqATR = {
    };
    
    smqATR.defer = function() {
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

    smqATR.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqATR.showPingPongs = true` to get verbose logging.');
        smqATR.virtualHost = virtualHost;
        smqATR.username = username;
        smqATR.password = password;
        smqATR.rabbitEndpoint = smqATR.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqATR.ATR_all_connection = {};
        smqATR.messages = [];
        smqATR.waitingReply = [];
        
        smqATR.client = Stomp.client(smqATR.rabbitEndpoint);

        smqATR.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqATR.showPingPongs) return;
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

        smqATR.checkMessage = function(msg) {
            
                // Can also hear what 'GAINSApi' can hear.
                
                // Can also hear what 'GAINSCoordinator' can hear.
                
                if (smqATR.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqATR.onGuestPing(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqATR.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqATR.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqATR.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqATR.onGuestLogin(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqATR.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqATR.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqATR.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqATR.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqATR.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqATR.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqATR.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqATR.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqATR.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqATR.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqATR.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqATR.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqATR.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqATR.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqATR.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqATR.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqATR.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqATR.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqATR.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqATR.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqATR.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqATR.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqATR.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqATR.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqATR.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqATR.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqATR.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqATR.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqATR.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqATR.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqATR.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqATR.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqATR.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqATR.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqATR.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqATR.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqATR.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqATR.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqATR.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqATR.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqATR.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqATR.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqATR.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqATR.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqATR.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqATR.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqATR.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqATR.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqATR.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqATR.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqATR.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqATR.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqATR.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqATR.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqATR.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqATR.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqATR.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqATR.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqATR.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqATR.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqATR.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqATR.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqATR.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqATR.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqATR.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqATR.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqATR.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqATR.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqATR.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqATR.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqATR.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqATR.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqATR.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqATR.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqATR.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqATR.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqATR.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqATR.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqATR.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqATR.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqATR.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqATR.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqATR.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqATR.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqATR.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqATR.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqATR.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetAllPeople) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getallpeople'))) {
                        var rpayload = smqATR.onGAINSUserGetAllPeople(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqATR.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqATR.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqATR.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqATR.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqATR.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqATR.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqATR.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqATR.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqATR.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqATR.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqATR.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqATR.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqATR.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqATR.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqATR.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqATR.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqATR.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqATR.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqATR.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqATR.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqATR.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqATR.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqATR.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqATR.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqATR.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqATR.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqATR.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqATR.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqATR.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqATR.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqATR.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqATR.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqATR.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqATR.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqATR.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqATR.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqATR.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqATR.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqATR.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqATR.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqATR.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqATR.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                if (smqATR.onGAINSUserGetSlotViewDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getslotviewdetails'))) {
                        var rpayload = smqATR.onGAINSUserGetSlotViewDetails(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqATR.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqATR.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqATR.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqATR.ATR_all_connection = smqATR.client.subscribe("/exchange/atr.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqATR.messages.push(d);
                        smqATR.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqATR.showPingPongs) console.log('      --------  MESSAGE FOR smqATR: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqATR.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqATR.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqATR.waitingReply[corrID];
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

        console.log('connecting to: ' + smqATR.rabbitEndpoint + ', using ' + username + '/' + password);
        smqATR.client.connect(smqATR.username, smqATR.password, on_connect, on_error, smqATR.virtualHost);
    };

    smqATR.disconnect = function() {
        if (smqATR && smqATR.client) 
        {
            smqATR.client.disconnect();
        }
    }

    smqATR.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqATR.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqATR.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.AdminEditSeal = function() {
            smqATR.AdminEditSeal('{}');
        }

        smqATR.AdminEditSeal = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Admin Edit Seal - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.admineditseal', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.ATRMaintenanceRecord = function() {
            smqATR.ATRMaintenanceRecord('{}');
        }

        smqATR.ATRMaintenanceRecord = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('A T R Maintenance Record - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrmaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.ATRServiceRecord = function() {
            smqATR.ATRServiceRecord('{}');
        }

        smqATR.ATRServiceRecord = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('A T R Service Record - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrservicerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.CancelScheduledATRChange = function() {
            smqATR.CancelScheduledATRChange('{}');
        }

        smqATR.CancelScheduledATRChange = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Cancel Scheduled A T R Change - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.cancelscheduledatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.CompleteATRChange = function() {
            smqATR.CompleteATRChange('{}');
        }

        smqATR.CompleteATRChange = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Complete A T R Change - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.completeatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GCATRInspection = function() {
            smqATR.GCATRInspection('{}');
        }

        smqATR.GCATRInspection = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('G C A T R Inspection - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.gcatrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.ScheduleATRChange = function() {
            smqATR.ScheduleATRChange('{}');
        }

        smqATR.ScheduleATRChange = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Schedule A T R Change - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.scheduleatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.VersionCameraUpdate = function() {
            smqATR.VersionCameraUpdate('{}');
        }

        smqATR.VersionCameraUpdate = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Version Camera Update - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.versioncameraupdate', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetComponentList = function() {
            smqATR.GetComponentList('{}');
        }

        smqATR.GetComponentList = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Component List - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcomponentlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetManufacturerList = function() {
            smqATR.GetManufacturerList('{}');
        }

        smqATR.GetManufacturerList = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Manufacturer List - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmanufacturerlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetInstalledComponents = function() {
            smqATR.GetInstalledComponents('{}');
        }

        smqATR.GetInstalledComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Installed Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetCDIDetails = function() {
            smqATR.GetCDIDetails('{}');
        }

        smqATR.GetCDIDetails = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get C D I Details - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcdidetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.SearchInstalledComponents = function() {
            smqATR.SearchInstalledComponents('{}');
        }

        smqATR.SearchInstalledComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Search Installed Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.SearchUnlinkedComponents = function() {
            smqATR.SearchUnlinkedComponents('{}');
        }

        smqATR.SearchUnlinkedComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Search Unlinked Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchunlinkedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.SearchCDIComponents = function() {
            smqATR.SearchCDIComponents('{}');
        }

        smqATR.SearchCDIComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Search C D I Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchcdicomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetMatchingSignatures = function() {
            smqATR.GetMatchingSignatures('{}');
        }

        smqATR.GetMatchingSignatures = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Matching Signatures - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmatchingsignatures', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.LinkComponent = function() {
            smqATR.LinkComponent('{}');
        }

        smqATR.LinkComponent = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Link Component - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.linkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.UnlinkComponent = function() {
            smqATR.UnlinkComponent('{}');
        }

        smqATR.UnlinkComponent = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Unlink Component - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.unlinkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetNewCDIs = function() {
            smqATR.GetNewCDIs('{}');
        }

        smqATR.GetNewCDIs = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get New C D Is - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getnewcdis', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GenerateSlotCompDef = function() {
            smqATR.GenerateSlotCompDef('{}');
        }

        smqATR.GenerateSlotCompDef = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Generate Slot Comp Def - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.generateslotcompdef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetConflictedComponents = function() {
            smqATR.GetConflictedComponents('{}');
        }

        smqATR.GetConflictedComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Conflicted Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getconflictedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.RevokeConflictedComponent = function() {
            smqATR.RevokeConflictedComponent('{}');
        }

        smqATR.RevokeConflictedComponent = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Revoke Conflicted Component - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.revokeconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetSlotDefInstalledComponents = function() {
            smqATR.GetSlotDefInstalledComponents('{}');
        }

        smqATR.GetSlotDefInstalledComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Def Installed Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdefinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.ResolveConflictedComponent = function() {
            smqATR.ResolveConflictedComponent('{}');
        }

        smqATR.ResolveConflictedComponent = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Resolve Conflicted Component - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.resolveconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetSlotDetails = function() {
            smqATR.GetSlotDetails('{}');
        }

        smqATR.GetSlotDetails = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Details - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GetSharedInstalledComponents = function() {
            smqATR.GetSharedInstalledComponents('{}');
        }

        smqATR.GetSharedInstalledComponents = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqATR.showPingPongs) console.log('Get Shared Installed Components - ');
            smqATR.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getsharedinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSApi' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.GAINSApiAccessToken = function() {
            smqATR.GAINSApiAccessToken('{}');
        }

        smqATR.GAINSApiAccessToken = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSApi.showPingPongs) console.log('Access Token - A Gains API provides an access token to the coordinator');
            smqATR.client.send('/exchange/gainsapimic/gainscoordinator.account.gainsapi.accesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSCoordinator' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.GAINSCoordinatorAnnouncement = function() {
            smqATR.GAINSCoordinatorAnnouncement('{}');
        }

        smqATR.GAINSCoordinatorAnnouncement = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqATR.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.GamingAgentPing = function() {
            smqATR.GamingAgentPing('{}');
        }

        smqATR.GamingAgentPing = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentScheduleBJTournament = function() {
            smqATR.GamingAgentScheduleBJTournament('{}');
        }

        smqATR.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentCompleteTableAdd = function() {
            smqATR.GamingAgentCompleteTableAdd('{}');
        }

        smqATR.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentActivateTournament = function() {
            smqATR.GamingAgentActivateTournament('{}');
        }

        smqATR.GamingAgentActivateTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentScheduleTableModification = function() {
            smqATR.GamingAgentScheduleTableModification('{}');
        }

        smqATR.GamingAgentScheduleTableModification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentScheduleTableRemoval = function() {
            smqATR.GamingAgentScheduleTableRemoval('{}');
        }

        smqATR.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentEndTournament = function() {
            smqATR.GamingAgentEndTournament('{}');
        }

        smqATR.GamingAgentEndTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentCompleteTableRemoval = function() {
            smqATR.GamingAgentCompleteTableRemoval('{}');
        }

        smqATR.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentTableAddNotification = function() {
            smqATR.GamingAgentTableAddNotification('{}');
        }

        smqATR.GamingAgentTableAddNotification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentTableGamesFeltChecklist = function() {
            smqATR.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqATR.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentShuffleMasterVerification = function() {
            smqATR.GamingAgentShuffleMasterVerification('{}');
        }

        smqATR.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRelicensingSearch = function() {
            smqATR.GamingAgentRelicensingSearch('{}');
        }

        smqATR.GamingAgentRelicensingSearch = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRelicense = function() {
            smqATR.GamingAgentRelicense('{}');
        }

        smqATR.GamingAgentRelicense = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentGetRelicensesToRecheck = function() {
            smqATR.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqATR.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentUnlicense = function() {
            smqATR.GamingAgentUnlicense('{}');
        }

        smqATR.GamingAgentUnlicense = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentResolveRecheck = function() {
            smqATR.GamingAgentResolveRecheck('{}');
        }

        smqATR.GamingAgentResolveRecheck = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentGetGCInspectionRequiredList = function() {
            smqATR.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqATR.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentGetFeltReviewList = function() {
            smqATR.GamingAgentGetFeltReviewList('{}');
        }

        smqATR.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentCompleteApplyLicense = function() {
            smqATR.GamingAgentCompleteApplyLicense('{}');
        }

        smqATR.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentCompleteRemoval = function() {
            smqATR.GamingAgentCompleteRemoval('{}');
        }

        smqATR.GamingAgentCompleteRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentEditScheduledRemoval = function() {
            smqATR.GamingAgentEditScheduledRemoval('{}');
        }

        smqATR.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentEditSealGC = function() {
            smqATR.GamingAgentEditSealGC('{}');
        }

        smqATR.GamingAgentEditSealGC = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentEditSealsFloor = function() {
            smqATR.GamingAgentEditSealsFloor('{}');
        }

        smqATR.GamingAgentEditSealsFloor = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentEmergencyDropInspection = function() {
            smqATR.GamingAgentEmergencyDropInspection('{}');
        }

        smqATR.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentGCInspection = function() {
            smqATR.GamingAgentGCInspection('{}');
        }

        smqATR.GamingAgentGCInspection = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentJPVerify100K = function() {
            smqATR.GamingAgentJPVerify100K('{}');
        }

        smqATR.GamingAgentJPVerify100K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentJPVerify10K = function() {
            smqATR.GamingAgentJPVerify10K('{}');
        }

        smqATR.GamingAgentJPVerify10K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentJPVerify20K = function() {
            smqATR.GamingAgentJPVerify20K('{}');
        }

        smqATR.GamingAgentJPVerify20K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentJPVerify50K = function() {
            smqATR.GamingAgentJPVerify50K('{}');
        }

        smqATR.GamingAgentJPVerify50K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentMediaVerification = function() {
            smqATR.GamingAgentMediaVerification('{}');
        }

        smqATR.GamingAgentMediaVerification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRamClearPerform = function() {
            smqATR.GamingAgentRamClearPerform('{}');
        }

        smqATR.GamingAgentRamClearPerform = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentStackerFullRecord = function() {
            smqATR.GamingAgentStackerFullRecord('{}');
        }

        smqATR.GamingAgentStackerFullRecord = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentStateOfMinnesotaInspection = function() {
            smqATR.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqATR.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentCompleteConversionFloorAdv = function() {
            smqATR.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqATR.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRamClearConversion = function() {
            smqATR.GamingAgentRamClearConversion('{}');
        }

        smqATR.GamingAgentRamClearConversion = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRamClearToInspect = function() {
            smqATR.GamingAgentRamClearToInspect('{}');
        }

        smqATR.GamingAgentRamClearToInspect = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRamClearToActive = function() {
            smqATR.GamingAgentRamClearToActive('{}');
        }

        smqATR.GamingAgentRamClearToActive = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentRequestActivation = function() {
            smqATR.GamingAgentRequestActivation('{}');
        }

        smqATR.GamingAgentRequestActivation = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentSuspendedJPReverify100K = function() {
            smqATR.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqATR.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentSuspendedJPReverify10K = function() {
            smqATR.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqATR.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentSuspendedJPReverify20K = function() {
            smqATR.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqATR.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GamingAgentSuspendedJPReverify50K = function() {
            smqATR.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqATR.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqATR.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.BJFeltLogPing = function() {
            smqATR.BJFeltLogPing('{}');
        }

        smqATR.BJFeltLogPing = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogUpdateTableInfo = function() {
            smqATR.BJFeltLogUpdateTableInfo('{}');
        }

        smqATR.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogCompleteTableModification = function() {
            smqATR.BJFeltLogCompleteTableModification('{}');
        }

        smqATR.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogEndTournament = function() {
            smqATR.BJFeltLogEndTournament('{}');
        }

        smqATR.BJFeltLogEndTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogScheduleTableRemoval = function() {
            smqATR.BJFeltLogScheduleTableRemoval('{}');
        }

        smqATR.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogServiceShuffleMaster = function() {
            smqATR.BJFeltLogServiceShuffleMaster('{}');
        }

        smqATR.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogScheduleBJTournament = function() {
            smqATR.BJFeltLogScheduleBJTournament('{}');
        }

        smqATR.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogReceiveShuffleMaster = function() {
            smqATR.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqATR.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogTableAddNotification = function() {
            smqATR.BJFeltLogTableAddNotification('{}');
        }

        smqATR.BJFeltLogTableAddNotification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogActivateTournament = function() {
            smqATR.BJFeltLogActivateTournament('{}');
        }

        smqATR.BJFeltLogActivateTournament = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogCompleteTableAdd = function() {
            smqATR.BJFeltLogCompleteTableAdd('{}');
        }

        smqATR.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogCompleteTableRemoval = function() {
            smqATR.BJFeltLogCompleteTableRemoval('{}');
        }

        smqATR.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogScheduleTableModification = function() {
            smqATR.BJFeltLogScheduleTableModification('{}');
        }

        smqATR.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogLogFeltChange = function() {
            smqATR.BJFeltLogLogFeltChange('{}');
        }

        smqATR.BJFeltLogLogFeltChange = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogGetBlackTables = function() {
            smqATR.BJFeltLogGetBlackTables('{}');
        }

        smqATR.BJFeltLogGetBlackTables = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogGetShuffleMasters = function() {
            smqATR.BJFeltLogGetShuffleMasters('{}');
        }

        smqATR.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.BJFeltLogGetBlackTableProjects = function() {
            smqATR.BJFeltLogGetBlackTableProjects('{}');
        }

        smqATR.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqATR.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.GAINSUserPing = function() {
            smqATR.GAINSUserPing('{}');
        }

        smqATR.GAINSUserPing = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserMyRoles = function() {
            smqATR.GAINSUserMyRoles('{}');
        }

        smqATR.GAINSUserMyRoles = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetAssetCountsByWorkflow = function() {
            smqATR.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqATR.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetGamingLocations = function() {
            smqATR.GAINSUserGetGamingLocations('{}');
        }

        smqATR.GAINSUserGetGamingLocations = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetRelevantActions = function() {
            smqATR.GAINSUserGetRelevantActions('{}');
        }

        smqATR.GAINSUserGetRelevantActions = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetVersion = function() {
            smqATR.GAINSUserGetVersion('{}');
        }

        smqATR.GAINSUserGetVersion = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetAssetStatuses = function() {
            smqATR.GAINSUserGetAssetStatuses('{}');
        }

        smqATR.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetAssetsByStatus = function() {
            smqATR.GAINSUserGetAssetsByStatus('{}');
        }

        smqATR.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetFilteredAssetList = function() {
            smqATR.GAINSUserGetFilteredAssetList('{}');
        }

        smqATR.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetProjects = function() {
            smqATR.GAINSUserGetProjects('{}');
        }

        smqATR.GAINSUserGetProjects = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserUpdateProject = function() {
            smqATR.GAINSUserUpdateProject('{}');
        }

        smqATR.GAINSUserUpdateProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserAddProject = function() {
            smqATR.GAINSUserAddProject('{}');
        }

        smqATR.GAINSUserAddProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetProjectBanks = function() {
            smqATR.GAINSUserGetProjectBanks('{}');
        }

        smqATR.GAINSUserGetProjectBanks = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserAddProjectAsset = function() {
            smqATR.GAINSUserAddProjectAsset('{}');
        }

        smqATR.GAINSUserAddProjectAsset = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserRemoveProjectAsset = function() {
            smqATR.GAINSUserRemoveProjectAsset('{}');
        }

        smqATR.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserSearchBJTables = function() {
            smqATR.GAINSUserSearchBJTables('{}');
        }

        smqATR.GAINSUserSearchBJTables = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserSearchATRs = function() {
            smqATR.GAINSUserSearchATRs('{}');
        }

        smqATR.GAINSUserSearchATRs = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserSearchStoredSlots = function() {
            smqATR.GAINSUserSearchStoredSlots('{}');
        }

        smqATR.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserSearchOnFloorSlots = function() {
            smqATR.GAINSUserSearchOnFloorSlots('{}');
        }

        smqATR.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserSearchShuffleMasters = function() {
            smqATR.GAINSUserSearchShuffleMasters('{}');
        }

        smqATR.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserUpdateProjectBanks = function() {
            smqATR.GAINSUserUpdateProjectBanks('{}');
        }

        smqATR.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserDeleteProject = function() {
            smqATR.GAINSUserDeleteProject('{}');
        }

        smqATR.GAINSUserDeleteProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserCompleteProject = function() {
            smqATR.GAINSUserCompleteProject('{}');
        }

        smqATR.GAINSUserCompleteProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetCompletedProjects = function() {
            smqATR.GAINSUserGetCompletedProjects('{}');
        }

        smqATR.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetSlotProjects = function() {
            smqATR.GAINSUserGetSlotProjects('{}');
        }

        smqATR.GAINSUserGetSlotProjects = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetSlotProject = function() {
            smqATR.GAINSUserGetSlotProject('{}');
        }

        smqATR.GAINSUserGetSlotProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserCreateSlotProject = function() {
            smqATR.GAINSUserCreateSlotProject('{}');
        }

        smqATR.GAINSUserCreateSlotProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserAddSlotToProject = function() {
            smqATR.GAINSUserAddSlotToProject('{}');
        }

        smqATR.GAINSUserAddSlotToProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserRemoveSlotFromProject = function() {
            smqATR.GAINSUserRemoveSlotFromProject('{}');
        }

        smqATR.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetAllPeople = function() {
            smqATR.GAINSUserGetAllPeople('{}');
        }

        smqATR.GAINSUserGetAllPeople = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GAINSUserGetSlotViewDetails = function() {
            smqATR.GAINSUserGetSlotViewDetails('{}');
        }

        smqATR.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqATR.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqATR.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqATR.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqATR.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqATR.GuestPing = function() {
            smqATR.GuestPing('{}');
        }

        smqATR.GuestPing = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqATR.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        
        smqATR.GuestLogin = function() {
            smqATR.GuestLogin('{}');
        }

        smqATR.GuestLogin = function(payload) {
            payload = smqATR.stringifyValue(payload);
            var id = smqATR.createUUID();
            var deferred = smqATR.waitingReply[id] = smqATR.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqATR.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqATR.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqATR;
}

                    