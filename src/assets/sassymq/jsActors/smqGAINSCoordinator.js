

function generateGAINSCoordinatorActor() {
    var smqGAINSCoordinator = {
    };
    
    smqGAINSCoordinator.defer = function() {
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

    smqGAINSCoordinator.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqGAINSCoordinator.showPingPongs = true` to get verbose logging.');
        smqGAINSCoordinator.virtualHost = virtualHost;
        smqGAINSCoordinator.username = username;
        smqGAINSCoordinator.password = password;
        smqGAINSCoordinator.rabbitEndpoint = smqGAINSCoordinator.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqGAINSCoordinator.GAINSCoordinator_all_connection = {};
        smqGAINSCoordinator.messages = [];
        smqGAINSCoordinator.waitingReply = [];
        
        smqGAINSCoordinator.client = Stomp.client(smqGAINSCoordinator.rabbitEndpoint);

        smqGAINSCoordinator.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqGAINSCoordinator.showPingPongs) return;
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

        smqGAINSCoordinator.checkMessage = function(msg) {
            
                if (smqGAINSCoordinator.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqGAINSCoordinator.onGuestPing(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqGAINSCoordinator.onGuestLogin(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqGAINSCoordinator.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqGAINSCoordinator.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqGAINSCoordinator.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqGAINSCoordinator.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqGAINSCoordinator.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqGAINSCoordinator.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqGAINSCoordinator.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqGAINSCoordinator.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqGAINSCoordinator.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqGAINSCoordinator.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqGAINSCoordinator.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqGAINSCoordinator.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqGAINSCoordinator.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqGAINSCoordinator.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqGAINSCoordinator.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqGAINSCoordinator.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqGAINSCoordinator.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqGAINSCoordinator.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqGAINSCoordinator.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqGAINSCoordinator.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                if (smqGAINSCoordinator.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqGAINSCoordinator.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqGAINSCoordinator.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqGAINSCoordinator.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqGAINSCoordinator.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqGAINSCoordinator.GAINSCoordinator_all_connection = smqGAINSCoordinator.client.subscribe("/exchange/gainscoordinator.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqGAINSCoordinator.messages.push(d);
                        smqGAINSCoordinator.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqGAINSCoordinator.showPingPongs) console.log('      --------  MESSAGE FOR smqGAINSCoordinator: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqGAINSCoordinator.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqGAINSCoordinator.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqGAINSCoordinator.waitingReply[corrID];
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

        console.log('connecting to: ' + smqGAINSCoordinator.rabbitEndpoint + ', using ' + username + '/' + password);
        smqGAINSCoordinator.client.connect(smqGAINSCoordinator.username, smqGAINSCoordinator.password, on_connect, on_error, smqGAINSCoordinator.virtualHost);
    };

    smqGAINSCoordinator.disconnect = function() {
        if (smqGAINSCoordinator && smqGAINSCoordinator.client) 
        {
            smqGAINSCoordinator.client.disconnect();
        }
    }

    smqGAINSCoordinator.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqGAINSCoordinator.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqGAINSCoordinator.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqGAINSCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSCoordinator.Announcement = function() {
            smqGAINSCoordinator.Announcement('{}');
        }

        smqGAINSCoordinator.Announcement = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqGAINSCoordinator.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqGAINSCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSCoordinator.GamingAgentPing = function() {
            smqGAINSCoordinator.GamingAgentPing('{}');
        }

        smqGAINSCoordinator.GamingAgentPing = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentScheduleBJTournament = function() {
            smqGAINSCoordinator.GamingAgentScheduleBJTournament('{}');
        }

        smqGAINSCoordinator.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentCompleteTableAdd = function() {
            smqGAINSCoordinator.GamingAgentCompleteTableAdd('{}');
        }

        smqGAINSCoordinator.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentActivateTournament = function() {
            smqGAINSCoordinator.GamingAgentActivateTournament('{}');
        }

        smqGAINSCoordinator.GamingAgentActivateTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentScheduleTableModification = function() {
            smqGAINSCoordinator.GamingAgentScheduleTableModification('{}');
        }

        smqGAINSCoordinator.GamingAgentScheduleTableModification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentScheduleTableRemoval = function() {
            smqGAINSCoordinator.GamingAgentScheduleTableRemoval('{}');
        }

        smqGAINSCoordinator.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentEndTournament = function() {
            smqGAINSCoordinator.GamingAgentEndTournament('{}');
        }

        smqGAINSCoordinator.GamingAgentEndTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentCompleteTableRemoval = function() {
            smqGAINSCoordinator.GamingAgentCompleteTableRemoval('{}');
        }

        smqGAINSCoordinator.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentTableAddNotification = function() {
            smqGAINSCoordinator.GamingAgentTableAddNotification('{}');
        }

        smqGAINSCoordinator.GamingAgentTableAddNotification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentTableGamesFeltChecklist = function() {
            smqGAINSCoordinator.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqGAINSCoordinator.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentShuffleMasterVerification = function() {
            smqGAINSCoordinator.GamingAgentShuffleMasterVerification('{}');
        }

        smqGAINSCoordinator.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRelicensingSearch = function() {
            smqGAINSCoordinator.GamingAgentRelicensingSearch('{}');
        }

        smqGAINSCoordinator.GamingAgentRelicensingSearch = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRelicense = function() {
            smqGAINSCoordinator.GamingAgentRelicense('{}');
        }

        smqGAINSCoordinator.GamingAgentRelicense = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentGetRelicensesToRecheck = function() {
            smqGAINSCoordinator.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqGAINSCoordinator.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentUnlicense = function() {
            smqGAINSCoordinator.GamingAgentUnlicense('{}');
        }

        smqGAINSCoordinator.GamingAgentUnlicense = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentResolveRecheck = function() {
            smqGAINSCoordinator.GamingAgentResolveRecheck('{}');
        }

        smqGAINSCoordinator.GamingAgentResolveRecheck = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentGetGCInspectionRequiredList = function() {
            smqGAINSCoordinator.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqGAINSCoordinator.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentGetFeltReviewList = function() {
            smqGAINSCoordinator.GamingAgentGetFeltReviewList('{}');
        }

        smqGAINSCoordinator.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentCompleteApplyLicense = function() {
            smqGAINSCoordinator.GamingAgentCompleteApplyLicense('{}');
        }

        smqGAINSCoordinator.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentCompleteRemoval = function() {
            smqGAINSCoordinator.GamingAgentCompleteRemoval('{}');
        }

        smqGAINSCoordinator.GamingAgentCompleteRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentEditScheduledRemoval = function() {
            smqGAINSCoordinator.GamingAgentEditScheduledRemoval('{}');
        }

        smqGAINSCoordinator.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentEditSealGC = function() {
            smqGAINSCoordinator.GamingAgentEditSealGC('{}');
        }

        smqGAINSCoordinator.GamingAgentEditSealGC = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentEditSealsFloor = function() {
            smqGAINSCoordinator.GamingAgentEditSealsFloor('{}');
        }

        smqGAINSCoordinator.GamingAgentEditSealsFloor = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentEmergencyDropInspection = function() {
            smqGAINSCoordinator.GamingAgentEmergencyDropInspection('{}');
        }

        smqGAINSCoordinator.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentGCInspection = function() {
            smqGAINSCoordinator.GamingAgentGCInspection('{}');
        }

        smqGAINSCoordinator.GamingAgentGCInspection = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentJPVerify100K = function() {
            smqGAINSCoordinator.GamingAgentJPVerify100K('{}');
        }

        smqGAINSCoordinator.GamingAgentJPVerify100K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentJPVerify10K = function() {
            smqGAINSCoordinator.GamingAgentJPVerify10K('{}');
        }

        smqGAINSCoordinator.GamingAgentJPVerify10K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentJPVerify20K = function() {
            smqGAINSCoordinator.GamingAgentJPVerify20K('{}');
        }

        smqGAINSCoordinator.GamingAgentJPVerify20K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentJPVerify50K = function() {
            smqGAINSCoordinator.GamingAgentJPVerify50K('{}');
        }

        smqGAINSCoordinator.GamingAgentJPVerify50K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentMediaVerification = function() {
            smqGAINSCoordinator.GamingAgentMediaVerification('{}');
        }

        smqGAINSCoordinator.GamingAgentMediaVerification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRamClearPerform = function() {
            smqGAINSCoordinator.GamingAgentRamClearPerform('{}');
        }

        smqGAINSCoordinator.GamingAgentRamClearPerform = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentStackerFullRecord = function() {
            smqGAINSCoordinator.GamingAgentStackerFullRecord('{}');
        }

        smqGAINSCoordinator.GamingAgentStackerFullRecord = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentStateOfMinnesotaInspection = function() {
            smqGAINSCoordinator.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqGAINSCoordinator.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentCompleteConversionFloorAdv = function() {
            smqGAINSCoordinator.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqGAINSCoordinator.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRamClearConversion = function() {
            smqGAINSCoordinator.GamingAgentRamClearConversion('{}');
        }

        smqGAINSCoordinator.GamingAgentRamClearConversion = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRamClearToInspect = function() {
            smqGAINSCoordinator.GamingAgentRamClearToInspect('{}');
        }

        smqGAINSCoordinator.GamingAgentRamClearToInspect = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRamClearToActive = function() {
            smqGAINSCoordinator.GamingAgentRamClearToActive('{}');
        }

        smqGAINSCoordinator.GamingAgentRamClearToActive = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentRequestActivation = function() {
            smqGAINSCoordinator.GamingAgentRequestActivation('{}');
        }

        smqGAINSCoordinator.GamingAgentRequestActivation = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentSuspendedJPReverify100K = function() {
            smqGAINSCoordinator.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqGAINSCoordinator.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentSuspendedJPReverify10K = function() {
            smqGAINSCoordinator.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqGAINSCoordinator.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentSuspendedJPReverify20K = function() {
            smqGAINSCoordinator.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqGAINSCoordinator.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GamingAgentSuspendedJPReverify50K = function() {
            smqGAINSCoordinator.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqGAINSCoordinator.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqGAINSCoordinator.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqGAINSCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSCoordinator.BJFeltLogPing = function() {
            smqGAINSCoordinator.BJFeltLogPing('{}');
        }

        smqGAINSCoordinator.BJFeltLogPing = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogUpdateTableInfo = function() {
            smqGAINSCoordinator.BJFeltLogUpdateTableInfo('{}');
        }

        smqGAINSCoordinator.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogCompleteTableModification = function() {
            smqGAINSCoordinator.BJFeltLogCompleteTableModification('{}');
        }

        smqGAINSCoordinator.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogEndTournament = function() {
            smqGAINSCoordinator.BJFeltLogEndTournament('{}');
        }

        smqGAINSCoordinator.BJFeltLogEndTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogScheduleTableRemoval = function() {
            smqGAINSCoordinator.BJFeltLogScheduleTableRemoval('{}');
        }

        smqGAINSCoordinator.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogServiceShuffleMaster = function() {
            smqGAINSCoordinator.BJFeltLogServiceShuffleMaster('{}');
        }

        smqGAINSCoordinator.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogScheduleBJTournament = function() {
            smqGAINSCoordinator.BJFeltLogScheduleBJTournament('{}');
        }

        smqGAINSCoordinator.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogReceiveShuffleMaster = function() {
            smqGAINSCoordinator.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqGAINSCoordinator.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogTableAddNotification = function() {
            smqGAINSCoordinator.BJFeltLogTableAddNotification('{}');
        }

        smqGAINSCoordinator.BJFeltLogTableAddNotification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogActivateTournament = function() {
            smqGAINSCoordinator.BJFeltLogActivateTournament('{}');
        }

        smqGAINSCoordinator.BJFeltLogActivateTournament = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogCompleteTableAdd = function() {
            smqGAINSCoordinator.BJFeltLogCompleteTableAdd('{}');
        }

        smqGAINSCoordinator.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogCompleteTableRemoval = function() {
            smqGAINSCoordinator.BJFeltLogCompleteTableRemoval('{}');
        }

        smqGAINSCoordinator.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogScheduleTableModification = function() {
            smqGAINSCoordinator.BJFeltLogScheduleTableModification('{}');
        }

        smqGAINSCoordinator.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogLogFeltChange = function() {
            smqGAINSCoordinator.BJFeltLogLogFeltChange('{}');
        }

        smqGAINSCoordinator.BJFeltLogLogFeltChange = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogGetBlackTables = function() {
            smqGAINSCoordinator.BJFeltLogGetBlackTables('{}');
        }

        smqGAINSCoordinator.BJFeltLogGetBlackTables = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogGetShuffleMasters = function() {
            smqGAINSCoordinator.BJFeltLogGetShuffleMasters('{}');
        }

        smqGAINSCoordinator.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.BJFeltLogGetBlackTableProjects = function() {
            smqGAINSCoordinator.BJFeltLogGetBlackTableProjects('{}');
        }

        smqGAINSCoordinator.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqGAINSCoordinator.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqGAINSCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSCoordinator.GAINSUserPing = function() {
            smqGAINSCoordinator.GAINSUserPing('{}');
        }

        smqGAINSCoordinator.GAINSUserPing = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserMyRoles = function() {
            smqGAINSCoordinator.GAINSUserMyRoles('{}');
        }

        smqGAINSCoordinator.GAINSUserMyRoles = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetAssetCountsByWorkflow = function() {
            smqGAINSCoordinator.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqGAINSCoordinator.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetGamingLocations = function() {
            smqGAINSCoordinator.GAINSUserGetGamingLocations('{}');
        }

        smqGAINSCoordinator.GAINSUserGetGamingLocations = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetRelevantActions = function() {
            smqGAINSCoordinator.GAINSUserGetRelevantActions('{}');
        }

        smqGAINSCoordinator.GAINSUserGetRelevantActions = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetVersion = function() {
            smqGAINSCoordinator.GAINSUserGetVersion('{}');
        }

        smqGAINSCoordinator.GAINSUserGetVersion = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetAssetStatuses = function() {
            smqGAINSCoordinator.GAINSUserGetAssetStatuses('{}');
        }

        smqGAINSCoordinator.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetAssetsByStatus = function() {
            smqGAINSCoordinator.GAINSUserGetAssetsByStatus('{}');
        }

        smqGAINSCoordinator.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetFilteredAssetList = function() {
            smqGAINSCoordinator.GAINSUserGetFilteredAssetList('{}');
        }

        smqGAINSCoordinator.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetProjects = function() {
            smqGAINSCoordinator.GAINSUserGetProjects('{}');
        }

        smqGAINSCoordinator.GAINSUserGetProjects = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserUpdateProject = function() {
            smqGAINSCoordinator.GAINSUserUpdateProject('{}');
        }

        smqGAINSCoordinator.GAINSUserUpdateProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserAddProject = function() {
            smqGAINSCoordinator.GAINSUserAddProject('{}');
        }

        smqGAINSCoordinator.GAINSUserAddProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetProjectBanks = function() {
            smqGAINSCoordinator.GAINSUserGetProjectBanks('{}');
        }

        smqGAINSCoordinator.GAINSUserGetProjectBanks = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserAddProjectAsset = function() {
            smqGAINSCoordinator.GAINSUserAddProjectAsset('{}');
        }

        smqGAINSCoordinator.GAINSUserAddProjectAsset = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserRemoveProjectAsset = function() {
            smqGAINSCoordinator.GAINSUserRemoveProjectAsset('{}');
        }

        smqGAINSCoordinator.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserSearchBJTables = function() {
            smqGAINSCoordinator.GAINSUserSearchBJTables('{}');
        }

        smqGAINSCoordinator.GAINSUserSearchBJTables = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserSearchATRs = function() {
            smqGAINSCoordinator.GAINSUserSearchATRs('{}');
        }

        smqGAINSCoordinator.GAINSUserSearchATRs = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserSearchStoredSlots = function() {
            smqGAINSCoordinator.GAINSUserSearchStoredSlots('{}');
        }

        smqGAINSCoordinator.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserSearchOnFloorSlots = function() {
            smqGAINSCoordinator.GAINSUserSearchOnFloorSlots('{}');
        }

        smqGAINSCoordinator.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserSearchShuffleMasters = function() {
            smqGAINSCoordinator.GAINSUserSearchShuffleMasters('{}');
        }

        smqGAINSCoordinator.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserUpdateProjectBanks = function() {
            smqGAINSCoordinator.GAINSUserUpdateProjectBanks('{}');
        }

        smqGAINSCoordinator.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserDeleteProject = function() {
            smqGAINSCoordinator.GAINSUserDeleteProject('{}');
        }

        smqGAINSCoordinator.GAINSUserDeleteProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserCompleteProject = function() {
            smqGAINSCoordinator.GAINSUserCompleteProject('{}');
        }

        smqGAINSCoordinator.GAINSUserCompleteProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetCompletedProjects = function() {
            smqGAINSCoordinator.GAINSUserGetCompletedProjects('{}');
        }

        smqGAINSCoordinator.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetSlotProjects = function() {
            smqGAINSCoordinator.GAINSUserGetSlotProjects('{}');
        }

        smqGAINSCoordinator.GAINSUserGetSlotProjects = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserGetSlotProject = function() {
            smqGAINSCoordinator.GAINSUserGetSlotProject('{}');
        }

        smqGAINSCoordinator.GAINSUserGetSlotProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserCreateSlotProject = function() {
            smqGAINSCoordinator.GAINSUserCreateSlotProject('{}');
        }

        smqGAINSCoordinator.GAINSUserCreateSlotProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserAddSlotToProject = function() {
            smqGAINSCoordinator.GAINSUserAddSlotToProject('{}');
        }

        smqGAINSCoordinator.GAINSUserAddSlotToProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GAINSUserRemoveSlotFromProject = function() {
            smqGAINSCoordinator.GAINSUserRemoveSlotFromProject('{}');
        }

        smqGAINSCoordinator.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqGAINSCoordinator.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqGAINSCoordinator.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqGAINSCoordinator.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqGAINSCoordinator.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqGAINSCoordinator.GuestPing = function() {
            smqGAINSCoordinator.GuestPing('{}');
        }

        smqGAINSCoordinator.GuestPing = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqGAINSCoordinator.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        
        smqGAINSCoordinator.GuestLogin = function() {
            smqGAINSCoordinator.GuestLogin('{}');
        }

        smqGAINSCoordinator.GuestLogin = function(payload) {
            payload = smqGAINSCoordinator.stringifyValue(payload);
            var id = smqGAINSCoordinator.createUUID();
            var deferred = smqGAINSCoordinator.waitingReply[id] = smqGAINSCoordinator.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqGAINSCoordinator.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqGAINSCoordinator.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqGAINSCoordinator;
}

                    