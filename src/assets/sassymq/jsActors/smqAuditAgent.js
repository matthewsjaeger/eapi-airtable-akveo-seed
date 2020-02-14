

function generateAuditAgentActor() {
    var smqAuditAgent = {
    };
    
    smqAuditAgent.defer = function() {
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

    smqAuditAgent.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqAuditAgent.showPingPongs = true` to get verbose logging.');
        smqAuditAgent.virtualHost = virtualHost;
        smqAuditAgent.username = username;
        smqAuditAgent.password = password;
        smqAuditAgent.rabbitEndpoint = smqAuditAgent.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqAuditAgent.AuditAgent_all_connection = {};
        smqAuditAgent.messages = [];
        smqAuditAgent.waitingReply = [];
        
        smqAuditAgent.client = Stomp.client(smqAuditAgent.rabbitEndpoint);

        smqAuditAgent.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqAuditAgent.showPingPongs) return;
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

        smqAuditAgent.checkMessage = function(msg) {
            
                // Can also hear what 'SlotRepairAdmin' can hear.
                
                // Can also hear what 'ATR' can hear.
                
                // Can also hear what 'GAINSApi' can hear.
                
                // Can also hear what 'GAINSCoordinator' can hear.
                
                if (smqAuditAgent.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqAuditAgent.onGuestPing(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqAuditAgent.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqAuditAgent.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqAuditAgent.onGuestLogin(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqAuditAgent.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqAuditAgent.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqAuditAgent.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqAuditAgent.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqAuditAgent.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqAuditAgent.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqAuditAgent.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqAuditAgent.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqAuditAgent.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqAuditAgent.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqAuditAgent.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqAuditAgent.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqAuditAgent.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqAuditAgent.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqAuditAgent.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqAuditAgent.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqAuditAgent.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqAuditAgent.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqAuditAgent.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqAuditAgent.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqAuditAgent.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqAuditAgent.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqAuditAgent.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqAuditAgent.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqAuditAgent.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqAuditAgent.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqAuditAgent.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqAuditAgent.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqAuditAgent.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqAuditAgent.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqAuditAgent.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqAuditAgent.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqAuditAgent.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqAuditAgent.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqAuditAgent.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqAuditAgent.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqAuditAgent.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqAuditAgent.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqAuditAgent.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqAuditAgent.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqAuditAgent.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqAuditAgent.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqAuditAgent.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqAuditAgent.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqAuditAgent.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqAuditAgent.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqAuditAgent.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqAuditAgent.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqAuditAgent.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqAuditAgent.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqAuditAgent.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqAuditAgent.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetAllPeople) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getallpeople'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetAllPeople(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqAuditAgent.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqAuditAgent.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqAuditAgent.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqAuditAgent.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqAuditAgent.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqAuditAgent.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqAuditAgent.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqAuditAgent.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqAuditAgent.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqAuditAgent.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqAuditAgent.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqAuditAgent.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqAuditAgent.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqAuditAgent.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqAuditAgent.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqAuditAgent.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqAuditAgent.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqAuditAgent.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqAuditAgent.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                if (smqAuditAgent.onGAINSUserGetSlotViewDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getslotviewdetails'))) {
                        var rpayload = smqAuditAgent.onGAINSUserGetSlotViewDetails(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqAuditAgent.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqAuditAgent.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqAuditAgent.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqAuditAgent.AuditAgent_all_connection = smqAuditAgent.client.subscribe("/exchange/auditagent.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqAuditAgent.messages.push(d);
                        smqAuditAgent.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqAuditAgent.showPingPongs) console.log('      --------  MESSAGE FOR smqAuditAgent: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqAuditAgent.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqAuditAgent.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqAuditAgent.waitingReply[corrID];
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

        console.log('connecting to: ' + smqAuditAgent.rabbitEndpoint + ', using ' + username + '/' + password);
        smqAuditAgent.client.connect(smqAuditAgent.username, smqAuditAgent.password, on_connect, on_error, smqAuditAgent.virtualHost);
    };

    smqAuditAgent.disconnect = function() {
        if (smqAuditAgent && smqAuditAgent.client) 
        {
            smqAuditAgent.client.disconnect();
        }
    }

    smqAuditAgent.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqAuditAgent.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqAuditAgent.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.ATRInspection = function() {
            smqAuditAgent.ATRInspection('{}');
        }

        smqAuditAgent.ATRInspection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqAuditAgent.showPingPongs) console.log('A T R Inspection - ');
            smqAuditAgent.client.send('/exchange/auditagentmic/gainscoordinator.storage.auditagent.atrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'SlotRepairAdmin' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.SlotRepairAdminScheduleSale = function() {
            smqAuditAgent.SlotRepairAdminScheduleSale('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleSale = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Sale - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulesale', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminDesignateToMuseum = function() {
            smqAuditAgent.SlotRepairAdminDesignateToMuseum('{}');
        }

        smqAuditAgent.SlotRepairAdminDesignateToMuseum = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Designate To Museum - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.designatetomuseum', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminEditSeals = function() {
            smqAuditAgent.SlotRepairAdminEditSeals('{}');
        }

        smqAuditAgent.SlotRepairAdminEditSeals = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editseals', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleDestruction = function() {
            smqAuditAgent.SlotRepairAdminScheduleDestruction('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleDestruction = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Destruction - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.scheduledestruction', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleReturn = function() {
            smqAuditAgent.SlotRepairAdminScheduleReturn('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleReturn = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Return - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulereturn', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleStorageToFloor = function() {
            smqAuditAgent.SlotRepairAdminScheduleStorageToFloor('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleStorageToFloor = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminCancelScheduledEvent = function() {
            smqAuditAgent.SlotRepairAdminCancelScheduledEvent('{}');
        }

        smqAuditAgent.SlotRepairAdminCancelScheduledEvent = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.cancelscheduledevent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminCompleteConversion = function() {
            smqAuditAgent.SlotRepairAdminCompleteConversion('{}');
        }

        smqAuditAgent.SlotRepairAdminCompleteConversion = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.completeconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminEditConversion = function() {
            smqAuditAgent.SlotRepairAdminEditConversion('{}');
        }

        smqAuditAgent.SlotRepairAdminEditConversion = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminCancelScheduledEventFloor = function() {
            smqAuditAgent.SlotRepairAdminCancelScheduledEventFloor('{}');
        }

        smqAuditAgent.SlotRepairAdminCancelScheduledEventFloor = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event Floor - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminEditSealsAdmin = function() {
            smqAuditAgent.SlotRepairAdminEditSealsAdmin('{}');
        }

        smqAuditAgent.SlotRepairAdminEditSealsAdmin = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals Admin - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editsealsadmin', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminQuickCorrection = function() {
            smqAuditAgent.SlotRepairAdminQuickCorrection('{}');
        }

        smqAuditAgent.SlotRepairAdminQuickCorrection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Quick Correction - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.quickcorrection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleConversionAdv = function() {
            smqAuditAgent.SlotRepairAdminScheduleConversionAdv('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleConversionAdv = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Adv - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleMoveToStorage = function() {
            smqAuditAgent.SlotRepairAdminScheduleMoveToStorage('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleMoveToStorage = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminScheduleTournament = function() {
            smqAuditAgent.SlotRepairAdminScheduleTournament('{}');
        }

        smqAuditAgent.SlotRepairAdminScheduleTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Tournament - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduletournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminUpdateActiveSlot = function() {
            smqAuditAgent.SlotRepairAdminUpdateActiveSlot('{}');
        }

        smqAuditAgent.SlotRepairAdminUpdateActiveSlot = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Update Active Slot - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.updateactiveslot', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminEditConversionFloor = function() {
            smqAuditAgent.SlotRepairAdminEditConversionFloor('{}');
        }

        smqAuditAgent.SlotRepairAdminEditConversionFloor = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion Floor - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editconversionfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminDeactivateTournamentMode = function() {
            smqAuditAgent.SlotRepairAdminDeactivateTournamentMode('{}');
        }

        smqAuditAgent.SlotRepairAdminDeactivateTournamentMode = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Deactivate Tournament Mode - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.SlotRepairAdminActivateTournamentMode = function() {
            smqAuditAgent.SlotRepairAdminActivateTournamentMode('{}');
        }

        smqAuditAgent.SlotRepairAdminActivateTournamentMode = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Activate Tournament Mode - ');
            smqAuditAgent.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'ATR' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.ATRAdminEditSeal = function() {
            smqAuditAgent.ATRAdminEditSeal('{}');
        }

        smqAuditAgent.ATRAdminEditSeal = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Admin Edit Seal - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.admineditseal', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRATRMaintenanceRecord = function() {
            smqAuditAgent.ATRATRMaintenanceRecord('{}');
        }

        smqAuditAgent.ATRATRMaintenanceRecord = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('A T R Maintenance Record - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrmaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRATRServiceRecord = function() {
            smqAuditAgent.ATRATRServiceRecord('{}');
        }

        smqAuditAgent.ATRATRServiceRecord = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('A T R Service Record - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrservicerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRCancelScheduledATRChange = function() {
            smqAuditAgent.ATRCancelScheduledATRChange('{}');
        }

        smqAuditAgent.ATRCancelScheduledATRChange = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Cancel Scheduled A T R Change - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.cancelscheduledatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRCompleteATRChange = function() {
            smqAuditAgent.ATRCompleteATRChange('{}');
        }

        smqAuditAgent.ATRCompleteATRChange = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Complete A T R Change - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.completeatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGCATRInspection = function() {
            smqAuditAgent.ATRGCATRInspection('{}');
        }

        smqAuditAgent.ATRGCATRInspection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('G C A T R Inspection - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.gcatrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRScheduleATRChange = function() {
            smqAuditAgent.ATRScheduleATRChange('{}');
        }

        smqAuditAgent.ATRScheduleATRChange = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Schedule A T R Change - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.scheduleatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRVersionCameraUpdate = function() {
            smqAuditAgent.ATRVersionCameraUpdate('{}');
        }

        smqAuditAgent.ATRVersionCameraUpdate = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Version Camera Update - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.versioncameraupdate', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetComponentList = function() {
            smqAuditAgent.ATRGetComponentList('{}');
        }

        smqAuditAgent.ATRGetComponentList = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Component List - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcomponentlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetManufacturerList = function() {
            smqAuditAgent.ATRGetManufacturerList('{}');
        }

        smqAuditAgent.ATRGetManufacturerList = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Manufacturer List - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmanufacturerlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetInstalledComponents = function() {
            smqAuditAgent.ATRGetInstalledComponents('{}');
        }

        smqAuditAgent.ATRGetInstalledComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Installed Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetCDIDetails = function() {
            smqAuditAgent.ATRGetCDIDetails('{}');
        }

        smqAuditAgent.ATRGetCDIDetails = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get C D I Details - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcdidetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRSearchInstalledComponents = function() {
            smqAuditAgent.ATRSearchInstalledComponents('{}');
        }

        smqAuditAgent.ATRSearchInstalledComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Search Installed Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRSearchUnlinkedComponents = function() {
            smqAuditAgent.ATRSearchUnlinkedComponents('{}');
        }

        smqAuditAgent.ATRSearchUnlinkedComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Search Unlinked Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchunlinkedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRSearchCDIComponents = function() {
            smqAuditAgent.ATRSearchCDIComponents('{}');
        }

        smqAuditAgent.ATRSearchCDIComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Search C D I Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchcdicomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetMatchingSignatures = function() {
            smqAuditAgent.ATRGetMatchingSignatures('{}');
        }

        smqAuditAgent.ATRGetMatchingSignatures = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Matching Signatures - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmatchingsignatures', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRLinkComponent = function() {
            smqAuditAgent.ATRLinkComponent('{}');
        }

        smqAuditAgent.ATRLinkComponent = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Link Component - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.linkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRUnlinkComponent = function() {
            smqAuditAgent.ATRUnlinkComponent('{}');
        }

        smqAuditAgent.ATRUnlinkComponent = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Unlink Component - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.unlinkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetNewCDIs = function() {
            smqAuditAgent.ATRGetNewCDIs('{}');
        }

        smqAuditAgent.ATRGetNewCDIs = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get New C D Is - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getnewcdis', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGenerateSlotCompDef = function() {
            smqAuditAgent.ATRGenerateSlotCompDef('{}');
        }

        smqAuditAgent.ATRGenerateSlotCompDef = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Generate Slot Comp Def - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.generateslotcompdef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetConflictedComponents = function() {
            smqAuditAgent.ATRGetConflictedComponents('{}');
        }

        smqAuditAgent.ATRGetConflictedComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Conflicted Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getconflictedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRRevokeConflictedComponent = function() {
            smqAuditAgent.ATRRevokeConflictedComponent('{}');
        }

        smqAuditAgent.ATRRevokeConflictedComponent = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Revoke Conflicted Component - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.revokeconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetSlotDefInstalledComponents = function() {
            smqAuditAgent.ATRGetSlotDefInstalledComponents('{}');
        }

        smqAuditAgent.ATRGetSlotDefInstalledComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Def Installed Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdefinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRResolveConflictedComponent = function() {
            smqAuditAgent.ATRResolveConflictedComponent('{}');
        }

        smqAuditAgent.ATRResolveConflictedComponent = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Resolve Conflicted Component - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.resolveconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetSlotDetails = function() {
            smqAuditAgent.ATRGetSlotDetails('{}');
        }

        smqAuditAgent.ATRGetSlotDetails = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Details - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.ATRGetSharedInstalledComponents = function() {
            smqAuditAgent.ATRGetSharedInstalledComponents('{}');
        }

        smqAuditAgent.ATRGetSharedInstalledComponents = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqATR.showPingPongs) console.log('Get Shared Installed Components - ');
            smqAuditAgent.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getsharedinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSApi' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.GAINSApiAccessToken = function() {
            smqAuditAgent.GAINSApiAccessToken('{}');
        }

        smqAuditAgent.GAINSApiAccessToken = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSApi.showPingPongs) console.log('Access Token - A Gains API provides an access token to the coordinator');
            smqAuditAgent.client.send('/exchange/gainsapimic/gainscoordinator.account.gainsapi.accesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSCoordinator' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.GAINSCoordinatorAnnouncement = function() {
            smqAuditAgent.GAINSCoordinatorAnnouncement('{}');
        }

        smqAuditAgent.GAINSCoordinatorAnnouncement = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqAuditAgent.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.GamingAgentPing = function() {
            smqAuditAgent.GamingAgentPing('{}');
        }

        smqAuditAgent.GamingAgentPing = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentScheduleBJTournament = function() {
            smqAuditAgent.GamingAgentScheduleBJTournament('{}');
        }

        smqAuditAgent.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentCompleteTableAdd = function() {
            smqAuditAgent.GamingAgentCompleteTableAdd('{}');
        }

        smqAuditAgent.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentActivateTournament = function() {
            smqAuditAgent.GamingAgentActivateTournament('{}');
        }

        smqAuditAgent.GamingAgentActivateTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentScheduleTableModification = function() {
            smqAuditAgent.GamingAgentScheduleTableModification('{}');
        }

        smqAuditAgent.GamingAgentScheduleTableModification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentScheduleTableRemoval = function() {
            smqAuditAgent.GamingAgentScheduleTableRemoval('{}');
        }

        smqAuditAgent.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentEndTournament = function() {
            smqAuditAgent.GamingAgentEndTournament('{}');
        }

        smqAuditAgent.GamingAgentEndTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentCompleteTableRemoval = function() {
            smqAuditAgent.GamingAgentCompleteTableRemoval('{}');
        }

        smqAuditAgent.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentTableAddNotification = function() {
            smqAuditAgent.GamingAgentTableAddNotification('{}');
        }

        smqAuditAgent.GamingAgentTableAddNotification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentTableGamesFeltChecklist = function() {
            smqAuditAgent.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqAuditAgent.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentShuffleMasterVerification = function() {
            smqAuditAgent.GamingAgentShuffleMasterVerification('{}');
        }

        smqAuditAgent.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRelicensingSearch = function() {
            smqAuditAgent.GamingAgentRelicensingSearch('{}');
        }

        smqAuditAgent.GamingAgentRelicensingSearch = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRelicense = function() {
            smqAuditAgent.GamingAgentRelicense('{}');
        }

        smqAuditAgent.GamingAgentRelicense = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentGetRelicensesToRecheck = function() {
            smqAuditAgent.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqAuditAgent.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentUnlicense = function() {
            smqAuditAgent.GamingAgentUnlicense('{}');
        }

        smqAuditAgent.GamingAgentUnlicense = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentResolveRecheck = function() {
            smqAuditAgent.GamingAgentResolveRecheck('{}');
        }

        smqAuditAgent.GamingAgentResolveRecheck = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentGetGCInspectionRequiredList = function() {
            smqAuditAgent.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqAuditAgent.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentGetFeltReviewList = function() {
            smqAuditAgent.GamingAgentGetFeltReviewList('{}');
        }

        smqAuditAgent.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentCompleteApplyLicense = function() {
            smqAuditAgent.GamingAgentCompleteApplyLicense('{}');
        }

        smqAuditAgent.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentCompleteRemoval = function() {
            smqAuditAgent.GamingAgentCompleteRemoval('{}');
        }

        smqAuditAgent.GamingAgentCompleteRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentEditScheduledRemoval = function() {
            smqAuditAgent.GamingAgentEditScheduledRemoval('{}');
        }

        smqAuditAgent.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentEditSealGC = function() {
            smqAuditAgent.GamingAgentEditSealGC('{}');
        }

        smqAuditAgent.GamingAgentEditSealGC = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentEditSealsFloor = function() {
            smqAuditAgent.GamingAgentEditSealsFloor('{}');
        }

        smqAuditAgent.GamingAgentEditSealsFloor = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentEmergencyDropInspection = function() {
            smqAuditAgent.GamingAgentEmergencyDropInspection('{}');
        }

        smqAuditAgent.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentGCInspection = function() {
            smqAuditAgent.GamingAgentGCInspection('{}');
        }

        smqAuditAgent.GamingAgentGCInspection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentJPVerify100K = function() {
            smqAuditAgent.GamingAgentJPVerify100K('{}');
        }

        smqAuditAgent.GamingAgentJPVerify100K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentJPVerify10K = function() {
            smqAuditAgent.GamingAgentJPVerify10K('{}');
        }

        smqAuditAgent.GamingAgentJPVerify10K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentJPVerify20K = function() {
            smqAuditAgent.GamingAgentJPVerify20K('{}');
        }

        smqAuditAgent.GamingAgentJPVerify20K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentJPVerify50K = function() {
            smqAuditAgent.GamingAgentJPVerify50K('{}');
        }

        smqAuditAgent.GamingAgentJPVerify50K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentMediaVerification = function() {
            smqAuditAgent.GamingAgentMediaVerification('{}');
        }

        smqAuditAgent.GamingAgentMediaVerification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRamClearPerform = function() {
            smqAuditAgent.GamingAgentRamClearPerform('{}');
        }

        smqAuditAgent.GamingAgentRamClearPerform = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentStackerFullRecord = function() {
            smqAuditAgent.GamingAgentStackerFullRecord('{}');
        }

        smqAuditAgent.GamingAgentStackerFullRecord = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentStateOfMinnesotaInspection = function() {
            smqAuditAgent.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqAuditAgent.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentCompleteConversionFloorAdv = function() {
            smqAuditAgent.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqAuditAgent.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRamClearConversion = function() {
            smqAuditAgent.GamingAgentRamClearConversion('{}');
        }

        smqAuditAgent.GamingAgentRamClearConversion = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRamClearToInspect = function() {
            smqAuditAgent.GamingAgentRamClearToInspect('{}');
        }

        smqAuditAgent.GamingAgentRamClearToInspect = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRamClearToActive = function() {
            smqAuditAgent.GamingAgentRamClearToActive('{}');
        }

        smqAuditAgent.GamingAgentRamClearToActive = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentRequestActivation = function() {
            smqAuditAgent.GamingAgentRequestActivation('{}');
        }

        smqAuditAgent.GamingAgentRequestActivation = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentSuspendedJPReverify100K = function() {
            smqAuditAgent.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqAuditAgent.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentSuspendedJPReverify10K = function() {
            smqAuditAgent.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqAuditAgent.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentSuspendedJPReverify20K = function() {
            smqAuditAgent.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqAuditAgent.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GamingAgentSuspendedJPReverify50K = function() {
            smqAuditAgent.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqAuditAgent.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqAuditAgent.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.BJFeltLogPing = function() {
            smqAuditAgent.BJFeltLogPing('{}');
        }

        smqAuditAgent.BJFeltLogPing = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogUpdateTableInfo = function() {
            smqAuditAgent.BJFeltLogUpdateTableInfo('{}');
        }

        smqAuditAgent.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogCompleteTableModification = function() {
            smqAuditAgent.BJFeltLogCompleteTableModification('{}');
        }

        smqAuditAgent.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogEndTournament = function() {
            smqAuditAgent.BJFeltLogEndTournament('{}');
        }

        smqAuditAgent.BJFeltLogEndTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogScheduleTableRemoval = function() {
            smqAuditAgent.BJFeltLogScheduleTableRemoval('{}');
        }

        smqAuditAgent.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogServiceShuffleMaster = function() {
            smqAuditAgent.BJFeltLogServiceShuffleMaster('{}');
        }

        smqAuditAgent.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogScheduleBJTournament = function() {
            smqAuditAgent.BJFeltLogScheduleBJTournament('{}');
        }

        smqAuditAgent.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogReceiveShuffleMaster = function() {
            smqAuditAgent.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqAuditAgent.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogTableAddNotification = function() {
            smqAuditAgent.BJFeltLogTableAddNotification('{}');
        }

        smqAuditAgent.BJFeltLogTableAddNotification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogActivateTournament = function() {
            smqAuditAgent.BJFeltLogActivateTournament('{}');
        }

        smqAuditAgent.BJFeltLogActivateTournament = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogCompleteTableAdd = function() {
            smqAuditAgent.BJFeltLogCompleteTableAdd('{}');
        }

        smqAuditAgent.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogCompleteTableRemoval = function() {
            smqAuditAgent.BJFeltLogCompleteTableRemoval('{}');
        }

        smqAuditAgent.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogScheduleTableModification = function() {
            smqAuditAgent.BJFeltLogScheduleTableModification('{}');
        }

        smqAuditAgent.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogLogFeltChange = function() {
            smqAuditAgent.BJFeltLogLogFeltChange('{}');
        }

        smqAuditAgent.BJFeltLogLogFeltChange = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogGetBlackTables = function() {
            smqAuditAgent.BJFeltLogGetBlackTables('{}');
        }

        smqAuditAgent.BJFeltLogGetBlackTables = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogGetShuffleMasters = function() {
            smqAuditAgent.BJFeltLogGetShuffleMasters('{}');
        }

        smqAuditAgent.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.BJFeltLogGetBlackTableProjects = function() {
            smqAuditAgent.BJFeltLogGetBlackTableProjects('{}');
        }

        smqAuditAgent.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqAuditAgent.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.GAINSUserPing = function() {
            smqAuditAgent.GAINSUserPing('{}');
        }

        smqAuditAgent.GAINSUserPing = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserMyRoles = function() {
            smqAuditAgent.GAINSUserMyRoles('{}');
        }

        smqAuditAgent.GAINSUserMyRoles = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetAssetCountsByWorkflow = function() {
            smqAuditAgent.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqAuditAgent.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetGamingLocations = function() {
            smqAuditAgent.GAINSUserGetGamingLocations('{}');
        }

        smqAuditAgent.GAINSUserGetGamingLocations = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetRelevantActions = function() {
            smqAuditAgent.GAINSUserGetRelevantActions('{}');
        }

        smqAuditAgent.GAINSUserGetRelevantActions = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetVersion = function() {
            smqAuditAgent.GAINSUserGetVersion('{}');
        }

        smqAuditAgent.GAINSUserGetVersion = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetAssetStatuses = function() {
            smqAuditAgent.GAINSUserGetAssetStatuses('{}');
        }

        smqAuditAgent.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetAssetsByStatus = function() {
            smqAuditAgent.GAINSUserGetAssetsByStatus('{}');
        }

        smqAuditAgent.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetFilteredAssetList = function() {
            smqAuditAgent.GAINSUserGetFilteredAssetList('{}');
        }

        smqAuditAgent.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetProjects = function() {
            smqAuditAgent.GAINSUserGetProjects('{}');
        }

        smqAuditAgent.GAINSUserGetProjects = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserUpdateProject = function() {
            smqAuditAgent.GAINSUserUpdateProject('{}');
        }

        smqAuditAgent.GAINSUserUpdateProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserAddProject = function() {
            smqAuditAgent.GAINSUserAddProject('{}');
        }

        smqAuditAgent.GAINSUserAddProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetProjectBanks = function() {
            smqAuditAgent.GAINSUserGetProjectBanks('{}');
        }

        smqAuditAgent.GAINSUserGetProjectBanks = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserAddProjectAsset = function() {
            smqAuditAgent.GAINSUserAddProjectAsset('{}');
        }

        smqAuditAgent.GAINSUserAddProjectAsset = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserRemoveProjectAsset = function() {
            smqAuditAgent.GAINSUserRemoveProjectAsset('{}');
        }

        smqAuditAgent.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserSearchBJTables = function() {
            smqAuditAgent.GAINSUserSearchBJTables('{}');
        }

        smqAuditAgent.GAINSUserSearchBJTables = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserSearchATRs = function() {
            smqAuditAgent.GAINSUserSearchATRs('{}');
        }

        smqAuditAgent.GAINSUserSearchATRs = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserSearchStoredSlots = function() {
            smqAuditAgent.GAINSUserSearchStoredSlots('{}');
        }

        smqAuditAgent.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserSearchOnFloorSlots = function() {
            smqAuditAgent.GAINSUserSearchOnFloorSlots('{}');
        }

        smqAuditAgent.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserSearchShuffleMasters = function() {
            smqAuditAgent.GAINSUserSearchShuffleMasters('{}');
        }

        smqAuditAgent.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserUpdateProjectBanks = function() {
            smqAuditAgent.GAINSUserUpdateProjectBanks('{}');
        }

        smqAuditAgent.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserDeleteProject = function() {
            smqAuditAgent.GAINSUserDeleteProject('{}');
        }

        smqAuditAgent.GAINSUserDeleteProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserCompleteProject = function() {
            smqAuditAgent.GAINSUserCompleteProject('{}');
        }

        smqAuditAgent.GAINSUserCompleteProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetCompletedProjects = function() {
            smqAuditAgent.GAINSUserGetCompletedProjects('{}');
        }

        smqAuditAgent.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetSlotProjects = function() {
            smqAuditAgent.GAINSUserGetSlotProjects('{}');
        }

        smqAuditAgent.GAINSUserGetSlotProjects = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetSlotProject = function() {
            smqAuditAgent.GAINSUserGetSlotProject('{}');
        }

        smqAuditAgent.GAINSUserGetSlotProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserCreateSlotProject = function() {
            smqAuditAgent.GAINSUserCreateSlotProject('{}');
        }

        smqAuditAgent.GAINSUserCreateSlotProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserAddSlotToProject = function() {
            smqAuditAgent.GAINSUserAddSlotToProject('{}');
        }

        smqAuditAgent.GAINSUserAddSlotToProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserRemoveSlotFromProject = function() {
            smqAuditAgent.GAINSUserRemoveSlotFromProject('{}');
        }

        smqAuditAgent.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetAllPeople = function() {
            smqAuditAgent.GAINSUserGetAllPeople('{}');
        }

        smqAuditAgent.GAINSUserGetAllPeople = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GAINSUserGetSlotViewDetails = function() {
            smqAuditAgent.GAINSUserGetSlotViewDetails('{}');
        }

        smqAuditAgent.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqAuditAgent.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqAuditAgent.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqAuditAgent.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqAuditAgent.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqAuditAgent.GuestPing = function() {
            smqAuditAgent.GuestPing('{}');
        }

        smqAuditAgent.GuestPing = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            smqAuditAgent.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        
        smqAuditAgent.GuestLogin = function() {
            smqAuditAgent.GuestLogin('{}');
        }

        smqAuditAgent.GuestLogin = function(payload) {
            payload = smqAuditAgent.stringifyValue(payload);
            var id = smqAuditAgent.createUUID();
            var deferred = smqAuditAgent.waitingReply[id] = smqAuditAgent.defer();
            smqAuditAgent.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqAuditAgent.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqAuditAgent;
}

