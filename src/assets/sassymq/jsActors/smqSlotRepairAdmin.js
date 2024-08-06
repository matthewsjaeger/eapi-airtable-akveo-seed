function generateSlotRepairAdminActor() {
    var smqSlotRepairAdmin = {
    };
    
    smqSlotRepairAdmin.defer = function() {
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

    smqSlotRepairAdmin.connect = function (virtualHost, username, password, on_received, after_connect) {
        console.warn('set `smqSlotRepairAdmin.showPingPongs = true` to get verbose logging.');
        smqSlotRepairAdmin.virtualHost = virtualHost;
        smqSlotRepairAdmin.username = username;
        smqSlotRepairAdmin.password = password;
        smqSlotRepairAdmin.rabbitEndpoint = smqSlotRepairAdmin.rabbitEndpoint || window.rabbitEndpoint || 'ws://sassymq.anabstractlevel.com:15674/ws';
        smqSlotRepairAdmin.SlotRepairAdmin_all_connection = {};
        smqSlotRepairAdmin.messages = [];
        smqSlotRepairAdmin.waitingReply = [];
        
        smqSlotRepairAdmin.client = window.Stomp.client(smqSlotRepairAdmin.rabbitEndpoint);

        smqSlotRepairAdmin.client.debug = function (m, p) {
            if (((m == ">>> PING") || (m == "<<< PONG")) && !smqSlotRepairAdmin.showPingPongs) return;
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

        smqSlotRepairAdmin.checkMessage = function(msg) {
            
                // Can also hear what 'ATR' can hear.
                
                // Can also hear what 'GAINSApi' can hear.
                
                // Can also hear what 'GAINSCoordinator' can hear.
                
                if (smqSlotRepairAdmin.onGuestPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.ping'))) {
                        var rpayload = smqSlotRepairAdmin.onGuestPing(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.ping'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserPing(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.bjfeltlog.ping'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogPing(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentPing) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gamingagent.ping'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentPing(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGuestLogin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.guest.login'))) {
                        var rpayload = smqSlotRepairAdmin.onGuestLogin(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserMyRoles) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsuser.myroles'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserMyRoles(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSApiAccessToken) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.account.gainsapi.accesstoken'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSApiAccessToken(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetAssetCountsByWorkflow) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetcountsbyworkflow'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetAssetCountsByWorkflow(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetGamingLocations) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getgaminglocations'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetGamingLocations(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetRelevantActions) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gainsuser.getrelevantactions'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetRelevantActions(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetVersion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getversion'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetVersion(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetAssetStatuses) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetstatuses'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetAssetStatuses(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetAssetsByStatus) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getassetsbystatus'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetAssetsByStatus(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetFilteredAssetList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getfilteredassetlist'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetFilteredAssetList(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojects'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetProjects(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserUpdateProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserUpdateProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserAddProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserAddProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getprojectbanks'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetProjectBanks(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserAddProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addprojectasset'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserAddProjectAsset(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserRemoveProjectAsset) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeprojectasset'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserRemoveProjectAsset(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchBJTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchbjtables'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchBJTables(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchATRs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchatrs'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchATRs(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchStoredSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchstoredslots'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchStoredSlots(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchOnFloorSlots) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchonfloorslots'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchOnFloorSlots(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchshufflemasters'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchShuffleMasters(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserUpdateProjectBanks) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.updateprojectbanks'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserUpdateProjectBanks(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogUpdateTableInfo) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.updatetableinfo'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogUpdateTableInfo(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogCompleteTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetablemodification'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogCompleteTableModification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.endtournament'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogEndTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletableremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogServiceShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogServiceShuffleMaster(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.schedulebjtournament'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogReceiveShuffleMaster) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogReceiveShuffleMaster(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.tableaddnotification'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogTableAddNotification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.activatetournament'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogActivateTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableadd'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.completetableremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.scheduletablemodification'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogScheduleTableModification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogLogFeltChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.logfeltchange'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogLogFeltChange(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentScheduleBJTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.schedulebjtournament'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentScheduleBJTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentCompleteTableAdd) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableadd'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentCompleteTableAdd(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentActivateTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.activatetournament'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentActivateTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentScheduleTableModification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletablemodification'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentScheduleTableModification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentScheduleTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.scheduletableremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentScheduleTableRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentEndTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.endtournament'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentEndTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentCompleteTableRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.completetableremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentCompleteTableRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentTableAddNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tableaddnotification'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentTableAddNotification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentTableGamesFeltChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentTableGamesFeltChecklist(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentShuffleMasterVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.shufflemasterverification'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentShuffleMasterVerification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogGetBlackTables) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktables'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogGetBlackTables(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogGetShuffleMasters) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getshufflemasters'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogGetShuffleMasters(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onBJFeltLogGetBlackTableProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.bjfeltlog.getblacktableprojects'))) {
                        var rpayload = smqSlotRepairAdmin.onBJFeltLogGetBlackTableProjects(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRAdminEditSeal) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.admineditseal'))) {
                        var rpayload = smqSlotRepairAdmin.onATRAdminEditSeal(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRATRMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrmaintenancerecord'))) {
                        var rpayload = smqSlotRepairAdmin.onATRATRMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRATRServiceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.atrservicerecord'))) {
                        var rpayload = smqSlotRepairAdmin.onATRATRServiceRecord(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRCancelScheduledATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.cancelscheduledatrchange'))) {
                        var rpayload = smqSlotRepairAdmin.onATRCancelScheduledATRChange(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRCompleteATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.completeatrchange'))) {
                        var rpayload = smqSlotRepairAdmin.onATRCompleteATRChange(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGCATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.gcatrinspection'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGCATRInspection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRScheduleATRChange) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.scheduleatrchange'))) {
                        var rpayload = smqSlotRepairAdmin.onATRScheduleATRChange(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRVersionCameraUpdate) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.versioncameraupdate'))) {
                        var rpayload = smqSlotRepairAdmin.onATRVersionCameraUpdate(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetComponentList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcomponentlist'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetComponentList(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetManufacturerList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmanufacturerlist'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetManufacturerList(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getinstalledcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetCDIDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getcdidetails'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetCDIDetails(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRSearchInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchinstalledcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRSearchInstalledComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRSearchUnlinkedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchunlinkedcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRSearchUnlinkedComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRSearchCDIComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.searchcdicomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRSearchCDIComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetMatchingSignatures) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getmatchingsignatures'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetMatchingSignatures(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRLinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.linkcomponent'))) {
                        var rpayload = smqSlotRepairAdmin.onATRLinkComponent(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRUnlinkComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.unlinkcomponent'))) {
                        var rpayload = smqSlotRepairAdmin.onATRUnlinkComponent(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetNewCDIs) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getnewcdis'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetNewCDIs(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGenerateSlotCompDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.generateslotcompdef'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGenerateSlotCompDef(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetConflictedComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getconflictedcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetConflictedComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRRevokeConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.revokeconflictedcomponent'))) {
                        var rpayload = smqSlotRepairAdmin.onATRRevokeConflictedComponent(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetSlotDefInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdefinstalledcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetSlotDefInstalledComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRResolveConflictedComponent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.resolveconflictedcomponent'))) {
                        var rpayload = smqSlotRepairAdmin.onATRResolveConflictedComponent(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetSlotDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getslotdetails'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetSlotDetails(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRelicensingSearch) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicensingsearch'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRelicensingSearch(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRelicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.relicense'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRelicense(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentGetRelicensesToRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getrelicensestorecheck'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentGetRelicensesToRecheck(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentUnlicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.unlicense'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentUnlicense(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentResolveRecheck) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.resolverecheck'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentResolveRecheck(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentGetGCInspectionRequiredList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentGetGCInspectionRequiredList(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentGetFeltReviewList) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.blackjack.gamingagent.getfeltreviewlist'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentGetFeltReviewList(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserDeleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.deleteproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserDeleteProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserCompleteProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.completeproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserCompleteProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetCompletedProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getcompletedprojects'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetCompletedProjects(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetSlotProjects) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotprojects'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetSlotProjects(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getslotproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetSlotProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserCreateSlotProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.createslotproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserCreateSlotProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserAddSlotToProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.addslottoproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserAddSlotToProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserRemoveSlotFromProject) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.removeslotfromproject'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserRemoveSlotFromProject(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetAllPeople) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getallpeople'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetAllPeople(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onATRGetSharedInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.atr.atr.getsharedinstalledcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onATRGetSharedInstalledComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleSale) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulesale'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleSale(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onAuditAgentATRInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.auditagent.atrinspection'))) {
                        var rpayload = smqSlotRepairAdmin.onAuditAgentATRInspection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentCompleteApplyLicense) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeapplylicense'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentCompleteApplyLicense(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminDesignateToMuseum) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.designatetomuseum'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminDesignateToMuseum(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminEditSeals) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editseals'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminEditSeals(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleDestruction) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.scheduledestruction'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleDestruction(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleReturn) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulereturn'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleReturn(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleStorageToFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleStorageToFloor(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCancelScheduledEvent) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.cancelscheduledevent'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCancelScheduledEvent(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentCompleteRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.completeremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentCompleteRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCompleteConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.completeconversion'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCompleteConversion(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminEditConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.slotrepairadmin.editconversion'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminEditConversion(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentEditScheduledRemoval) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.storage.gamingagent.editscheduledremoval'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentEditScheduledRemoval(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCancelScheduledEventFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCancelScheduledEventFloor(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentEditSealGC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealgc'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentEditSealGC(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentEditSealsFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.editsealsfloor'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentEditSealsFloor(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminEditSealsAdmin) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editsealsadmin'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminEditSealsAdmin(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentEmergencyDropInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.emergencydropinspection'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentEmergencyDropInspection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onAdministratorsForensicFieldChecklist) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.forensicfieldchecklist'))) {
                        var rpayload = smqSlotRepairAdmin.onAdministratorsForensicFieldChecklist(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentGCInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.gcinspection'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentGCInspection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentJPVerify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify100k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentJPVerify100K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentJPVerify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify10k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentJPVerify10K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentJPVerify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify20k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentJPVerify20K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentJPVerify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.jpverify50k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentJPVerify50K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentMediaVerification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.mediaverification'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentMediaVerification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminQuickCorrection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.quickcorrection'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminQuickCorrection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRamClearPerform) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearperform'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRamClearPerform(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleConversionAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleConversionAdv(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleMoveToStorage(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminScheduleTournament) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.scheduletournament'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminScheduleTournament(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onAdministratorsStackerFullNotification) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.stackerfullnotification'))) {
                        var rpayload = smqSlotRepairAdmin.onAdministratorsStackerFullNotification(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentStackerFullRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stackerfullrecord'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentStackerFullRecord(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentStateOfMinnesotaInspection) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.stateofminnesotainspection'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentStateOfMinnesotaInspection(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminUpdateActiveSlot) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.updateactiveslot'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminUpdateActiveSlot(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onAdministratorsCompleteConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.administrators.completeconversionfloor'))) {
                        var rpayload = smqSlotRepairAdmin.onAdministratorsCompleteConversionFloor(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentCompleteConversionFloorAdv) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.completeconversionflooradv'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentCompleteConversionFloorAdv(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminEditConversionFloor) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.editconversionfloor'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminEditConversionFloor(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRamClearConversion) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramclearconversion'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRamClearConversion(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRamClearToInspect) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoinspect'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRamClearToInspect(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRamClearToActive) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.ramcleartoactive'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRamClearToActive(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentRequestActivation) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.requestactivation'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentRequestActivation(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify100K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify100K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify10K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify10K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify20K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify20K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify50K) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentSuspendedJPReverify50K(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminDeactivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminDeactivateTournamentMode(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminActivateTournamentMode) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminActivateTournamentMode(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetSlotViewDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getslotviewdetails'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetSlotViewDetails(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGamingAgentPreventativeMaintenanceRecord) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord'))) {
                        var rpayload = smqSlotRepairAdmin.onGamingAgentPreventativeMaintenanceRecord(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetPersonByBadgeNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.getpersonbybadgenumber'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetPersonByBadgeNumber(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserValidateNewSealNumber) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.validatenewsealnumber'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserValidateNewSealNumber(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchGameName) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchgamename'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchGameName(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserSearchProgressiveDef) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.assets.gainsuser.searchprogressivedef'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserSearchProgressiveDef(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCompleteConversionMLC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionmlc'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCompleteConversionMLC(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCompleteConversionLSC) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completeconversionlsc'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCompleteConversionLSC(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminCompleteMoveToStorage) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.completemovetostorage'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminCompleteMoveToStorage(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminGetInstalledComponents) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getinstalledcomponents'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminGetInstalledComponents(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onSlotRepairAdminGetComponentById) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.slotrepairadmin.getcomponentbyid'))) {
                        var rpayload = smqSlotRepairAdmin.onSlotRepairAdminGetComponentById(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                if (smqSlotRepairAdmin.onGAINSUserGetConversionDetails) {
                    if (msg.headers && (msg.headers.destination.includes('gainscoordinator.onfloor.gainsuser.getconversiondetails'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSUserGetConversionDetails(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
                // Can also hear what 'GamingAgent' can hear.
                
                // Can also hear what 'BJFeltLog' can hear.
                
                // Can also hear what 'GAINSUser' can hear.
                
                // Can also hear what 'Guest' can hear.
                
                if (smqSlotRepairAdmin.onGAINSCoordinatorAnnouncement) {
                    if (msg.headers && (msg.headers.destination.includes('guest.general.gainscoordinator.announcement'))) {
                        var rpayload = smqSlotRepairAdmin.onGAINSCoordinatorAnnouncement(msg.body, msg);
                        if (rpayload) smqSlotRepairAdmin.sendReply(rpayload, msg);
                    }
                }
            
               
        }

        var on_connect = function (x) {
            smqSlotRepairAdmin.SlotRepairAdmin_all_connection = smqSlotRepairAdmin.client.subscribe("/exchange/slotrepairadmin.all/#",
                    function (d) {
                        if (d.body) d.body = JSON.parse(d.body);
                        smqSlotRepairAdmin.messages.push(d);
                        smqSlotRepairAdmin.checkMessage(d);
                        if (on_received) on_received(d);
                        if (smqSlotRepairAdmin.showPingPongs) console.log('      --------  MESSAGE FOR smqSlotRepairAdmin: ', d);
                    }, {
                        durable: false,
                        requeue: true
                    });
            smqSlotRepairAdmin.client.onreceive =  function (d) {
                        var body = JSON.parse(d.body);
                        var corrID = d.headers["correlation-id"];
                        var waitingDeferred = smqSlotRepairAdmin.waitingReply[corrID];

                        if (waitingDeferred && body.IsHandled) {
                            delete smqSlotRepairAdmin.waitingReply[corrID];
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

        console.log('connecting to: ' + smqSlotRepairAdmin.rabbitEndpoint + ', using ' + username + '/' + password);
        smqSlotRepairAdmin.client.connect(smqSlotRepairAdmin.username, smqSlotRepairAdmin.password, on_connect, on_error, smqSlotRepairAdmin.virtualHost);
    };

    smqSlotRepairAdmin.disconnect = function() {
        if (smqSlotRepairAdmin && smqSlotRepairAdmin.client) 
        {
            smqSlotRepairAdmin.client.disconnect();
        }
    }

    smqSlotRepairAdmin.stringifyValue = function(value) {
        if (!value) value = '{}';
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
        return value;
    };
    
    smqSlotRepairAdmin.sendReply = function(replyPayload, msg) {
        if (replyPayload && msg && msg.headers && msg.headers['reply-to']) {
            replyPayload.IsHandled = true;
            smqSlotRepairAdmin.client.send(msg.headers['reply-to'], 
                        { "content-type": "application/json", 
                          "reply-to":"/temp-queue/response-queue", 
                          "correlation-id":msg.headers['correlation-id'] 
                        }, JSON.stringify(replyPayload));
        }
    };

    
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.ScheduleSale = function() {
            smqSlotRepairAdmin.ScheduleSale('{}');
        }

        smqSlotRepairAdmin.ScheduleSale = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Sale - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulesale', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.DesignateToMuseum = function() {
            smqSlotRepairAdmin.DesignateToMuseum('{}');
        }

        smqSlotRepairAdmin.DesignateToMuseum = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Designate To Museum - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.designatetomuseum', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.EditSeals = function() {
            smqSlotRepairAdmin.EditSeals('{}');
        }

        smqSlotRepairAdmin.EditSeals = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editseals', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleDestruction = function() {
            smqSlotRepairAdmin.ScheduleDestruction('{}');
        }

        smqSlotRepairAdmin.ScheduleDestruction = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Destruction - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.scheduledestruction', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleReturn = function() {
            smqSlotRepairAdmin.ScheduleReturn('{}');
        }

        smqSlotRepairAdmin.ScheduleReturn = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Return - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulereturn', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleStorageToFloor = function() {
            smqSlotRepairAdmin.ScheduleStorageToFloor('{}');
        }

        smqSlotRepairAdmin.ScheduleStorageToFloor = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.schedulestoragetofloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CancelScheduledEvent = function() {
            smqSlotRepairAdmin.CancelScheduledEvent('{}');
        }

        smqSlotRepairAdmin.CancelScheduledEvent = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.cancelscheduledevent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CompleteConversion = function() {
            smqSlotRepairAdmin.CompleteConversion('{}');
        }

        smqSlotRepairAdmin.CompleteConversion = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.completeconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.EditConversion = function() {
            smqSlotRepairAdmin.EditConversion('{}');
        }

        smqSlotRepairAdmin.EditConversion = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.storage.slotrepairadmin.editconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CancelScheduledEventFloor = function() {
            smqSlotRepairAdmin.CancelScheduledEventFloor('{}');
        }

        smqSlotRepairAdmin.CancelScheduledEventFloor = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Event Floor - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.cancelscheduledeventfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.EditSealsAdmin = function() {
            smqSlotRepairAdmin.EditSealsAdmin('{}');
        }

        smqSlotRepairAdmin.EditSealsAdmin = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Seals Admin - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editsealsadmin', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.QuickCorrection = function() {
            smqSlotRepairAdmin.QuickCorrection('{}');
        }

        smqSlotRepairAdmin.QuickCorrection = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Quick Correction - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.quickcorrection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleConversionAdv = function() {
            smqSlotRepairAdmin.ScheduleConversionAdv('{}');
        }

        smqSlotRepairAdmin.ScheduleConversionAdv = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Adv - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionadv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleConversionWrite = function () {
          smqSlotRepairAdmin.ScheduleConversionWrite('{}');
        }

        smqSlotRepairAdmin.ScheduleConversionWrite = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Write - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionwrite', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleConversionRead = function () {
          smqSlotRepairAdmin.ScheduleConversionRead('{}');
        }

        smqSlotRepairAdmin.ScheduleConversionRead = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Read - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionread', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleConversionConfirm = function () {
          smqSlotRepairAdmin.ScheduleConversionConfirm('{}');
        }

        smqSlotRepairAdmin.ScheduleConversionConfirm = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Conversion Confirm - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleconversionconfirm', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageWrite = function () {
          smqSlotRepairAdmin.ScheduleMoveToStorageWrite('{}');
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageWrite = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage Write - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostoragewrite', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageRead = function () {
          smqSlotRepairAdmin.ScheduleMoveToStorageRead('{}');
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageRead = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage Read - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorageread', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageConfirm = function () {
          smqSlotRepairAdmin.ScheduleMoveToStorageConfirm('{}');
        }

        smqSlotRepairAdmin.ScheduleMoveToStorageConfirm = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage Confirm - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorageconfirm', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorWrite = function () {
          smqSlotRepairAdmin.ScheduleStorageToFloorWrite('{}');
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorWrite = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor Write - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulestoragetofloorwrite', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorRead = function () {
          smqSlotRepairAdmin.ScheduleStorageToFloorRead('{}');
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorRead = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor Read - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulestoragetofloorread', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorConfirm = function () {
          smqSlotRepairAdmin.ScheduleStorageToFloorConfirm('{}');
        }

        smqSlotRepairAdmin.ScheduleStorageToFloorConfirm = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Storage To Floor - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulestoragetofloorconfirm', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleRemovalWrite = function () {
          smqSlotRepairAdmin.ScheduleRemovalWrite('{}');
        }

        smqSlotRepairAdmin.ScheduleRemovalWrite = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Removal Write - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleremovalwrite', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleRemovalRead = function () {
          smqSlotRepairAdmin.ScheduleRemovalRead('{}');
        }

        smqSlotRepairAdmin.ScheduleRemovalRead = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Removal Read - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleremovalread', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ScheduleRemovalConfirm = function () {
          smqSlotRepairAdmin.ScheduleRemovalConfirm('{}');
        }

        smqSlotRepairAdmin.ScheduleRemovalConfirm = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Removal - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduleremovalconfirm', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.GetOpenEvents = function () {
          smqSlotRepairAdmin.GetOpenEvents('{}');
        }

        smqSlotRepairAdmin.GetOpenEvents = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Get Open Events - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.getopenevents', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.CancelScheduledEvents = function () {
          smqSlotRepairAdmin.CancelScheduledEvents('{}');
        }

        smqSlotRepairAdmin.CancelScheduledEvents = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Cancel Scheduled Events - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.cancelscheduledevents', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.CreateSlot = function () {
          smqSlotRepairAdmin.CreateSlot('{}');
        }

        smqSlotRepairAdmin.CreateSlot = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Create Slot - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.createslot', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.RequestReceiveSlot = function () {
          smqSlotRepairAdmin.RequestReceiveSlot('{}');
        }

        smqSlotRepairAdmin.RequestReceiveSlot = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Request Receive Slot - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.requestreceiveslot', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }

        smqSlotRepairAdmin.ReceivePurchasedSlot = function () {
          smqSlotRepairAdmin.ReceivePurchasedSlot('{}');
        }

        smqSlotRepairAdmin.ReceivePurchasedSlot = function (payload) {
          payload = smqSlotRepairAdmin.stringifyValue(payload);
          var id = smqSlotRepairAdmin.createUUID();
          var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
          if (smqSlotRepairAdmin.showPingPongs) console.log('Receive Purchased Slot - ');
          smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.receivepurchasedslot', { "content-type": "text/plain", "reply-to": "/temp-queue/response-queue", "correlation-id": id }, payload);

          smqSlotRepairAdmin.waitFor(id);

          return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleMoveToStorage = function() {
            smqSlotRepairAdmin.ScheduleMoveToStorage('{}');
        }

        smqSlotRepairAdmin.ScheduleMoveToStorage = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Move To Storage - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.schedulemovetostorage', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ScheduleTournament = function() {
            smqSlotRepairAdmin.ScheduleTournament('{}');
        }

        smqSlotRepairAdmin.ScheduleTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Schedule Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.scheduletournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.UpdateActiveSlot = function() {
            smqSlotRepairAdmin.UpdateActiveSlot('{}');
        }

        smqSlotRepairAdmin.UpdateActiveSlot = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Update Active Slot - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.updateactiveslot', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.EditConversionFloor = function() {
            smqSlotRepairAdmin.EditConversionFloor('{}');
        }

        smqSlotRepairAdmin.EditConversionFloor = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Edit Conversion Floor - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.editconversionfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.DeactivateTournamentMode = function() {
            smqSlotRepairAdmin.DeactivateTournamentMode('{}');
        }

        smqSlotRepairAdmin.DeactivateTournamentMode = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Deactivate Tournament Mode - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.deactivatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ActivateTournamentMode = function() {
            smqSlotRepairAdmin.ActivateTournamentMode('{}');
        }

        smqSlotRepairAdmin.ActivateTournamentMode = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Activate Tournament Mode - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.activatetournamentmode', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CompleteConversionMLC = function() {
            smqSlotRepairAdmin.CompleteConversionMLC('{}');
        }

        smqSlotRepairAdmin.CompleteConversionMLC = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion M L C - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completeconversionmlc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CompleteConversionLSC = function() {
            smqSlotRepairAdmin.CompleteConversionLSC('{}');
        }

        smqSlotRepairAdmin.CompleteConversionLSC = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Conversion L S C - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completeconversionlsc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.CompleteMoveToStorage = function() {
            smqSlotRepairAdmin.CompleteMoveToStorage('{}');
        }

        smqSlotRepairAdmin.CompleteMoveToStorage = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Complete Move To Storage - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.completemovetostorage', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GetInstalledComponents = function() {
            smqSlotRepairAdmin.GetInstalledComponents('{}');
        }

        smqSlotRepairAdmin.GetInstalledComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Get Installed Components - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GetComponentById = function() {
            smqSlotRepairAdmin.GetComponentById('{}');
        }

        smqSlotRepairAdmin.GetComponentById = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqSlotRepairAdmin.showPingPongs) console.log('Get Component By Id - ');
            smqSlotRepairAdmin.client.send('/exchange/slotrepairadminmic/gainscoordinator.onfloor.slotrepairadmin.getcomponentbyid', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'ATR' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.ATRAdminEditSeal = function() {
            smqSlotRepairAdmin.ATRAdminEditSeal('{}');
        }

        smqSlotRepairAdmin.ATRAdminEditSeal = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Admin Edit Seal - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.admineditseal', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRATRMaintenanceRecord = function() {
            smqSlotRepairAdmin.ATRATRMaintenanceRecord('{}');
        }

        smqSlotRepairAdmin.ATRATRMaintenanceRecord = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('A T R Maintenance Record - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrmaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRATRServiceRecord = function() {
            smqSlotRepairAdmin.ATRATRServiceRecord('{}');
        }

        smqSlotRepairAdmin.ATRATRServiceRecord = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('A T R Service Record - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.atrservicerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRCancelScheduledATRChange = function() {
            smqSlotRepairAdmin.ATRCancelScheduledATRChange('{}');
        }

        smqSlotRepairAdmin.ATRCancelScheduledATRChange = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Cancel Scheduled A T R Change - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.cancelscheduledatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRCompleteATRChange = function() {
            smqSlotRepairAdmin.ATRCompleteATRChange('{}');
        }

        smqSlotRepairAdmin.ATRCompleteATRChange = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Complete A T R Change - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.completeatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGCATRInspection = function() {
            smqSlotRepairAdmin.ATRGCATRInspection('{}');
        }

        smqSlotRepairAdmin.ATRGCATRInspection = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('G C A T R Inspection - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.gcatrinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRScheduleATRChange = function() {
            smqSlotRepairAdmin.ATRScheduleATRChange('{}');
        }

        smqSlotRepairAdmin.ATRScheduleATRChange = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Schedule A T R Change - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.scheduleatrchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRVersionCameraUpdate = function() {
            smqSlotRepairAdmin.ATRVersionCameraUpdate('{}');
        }

        smqSlotRepairAdmin.ATRVersionCameraUpdate = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Version Camera Update - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.versioncameraupdate', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetComponentList = function() {
            smqSlotRepairAdmin.ATRGetComponentList('{}');
        }

        smqSlotRepairAdmin.ATRGetComponentList = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Component List - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcomponentlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetManufacturerList = function() {
            smqSlotRepairAdmin.ATRGetManufacturerList('{}');
        }

        smqSlotRepairAdmin.ATRGetManufacturerList = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Manufacturer List - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmanufacturerlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetInstalledComponents = function() {
            smqSlotRepairAdmin.ATRGetInstalledComponents('{}');
        }

        smqSlotRepairAdmin.ATRGetInstalledComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Installed Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetCDIDetails = function() {
            smqSlotRepairAdmin.ATRGetCDIDetails('{}');
        }

        smqSlotRepairAdmin.ATRGetCDIDetails = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get C D I Details - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getcdidetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRSearchInstalledComponents = function() {
            smqSlotRepairAdmin.ATRSearchInstalledComponents('{}');
        }

        smqSlotRepairAdmin.ATRSearchInstalledComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Search Installed Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRSearchUnlinkedComponents = function() {
            smqSlotRepairAdmin.ATRSearchUnlinkedComponents('{}');
        }

        smqSlotRepairAdmin.ATRSearchUnlinkedComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Search Unlinked Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchunlinkedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRSearchCDIComponents = function() {
            smqSlotRepairAdmin.ATRSearchCDIComponents('{}');
        }

        smqSlotRepairAdmin.ATRSearchCDIComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Search C D I Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.searchcdicomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetMatchingSignatures = function() {
            smqSlotRepairAdmin.ATRGetMatchingSignatures('{}');
        }

        smqSlotRepairAdmin.ATRGetMatchingSignatures = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Matching Signatures - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getmatchingsignatures', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRLinkComponent = function() {
            smqSlotRepairAdmin.ATRLinkComponent('{}');
        }

        smqSlotRepairAdmin.ATRLinkComponent = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Link Component - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.linkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRUnlinkComponent = function() {
            smqSlotRepairAdmin.ATRUnlinkComponent('{}');
        }

        smqSlotRepairAdmin.ATRUnlinkComponent = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Unlink Component - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.unlinkcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetNewCDIs = function() {
            smqSlotRepairAdmin.ATRGetNewCDIs('{}');
        }

        smqSlotRepairAdmin.ATRGetNewCDIs = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get New C D Is - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getnewcdis', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGenerateSlotCompDef = function() {
            smqSlotRepairAdmin.ATRGenerateSlotCompDef('{}');
        }

        smqSlotRepairAdmin.ATRGenerateSlotCompDef = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Generate Slot Comp Def - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.generateslotcompdef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetConflictedComponents = function() {
            smqSlotRepairAdmin.ATRGetConflictedComponents('{}');
        }

        smqSlotRepairAdmin.ATRGetConflictedComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Conflicted Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getconflictedcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRRevokeConflictedComponent = function() {
            smqSlotRepairAdmin.ATRRevokeConflictedComponent('{}');
        }

        smqSlotRepairAdmin.ATRRevokeConflictedComponent = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Revoke Conflicted Component - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.revokeconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetSlotDefInstalledComponents = function() {
            smqSlotRepairAdmin.ATRGetSlotDefInstalledComponents('{}');
        }

        smqSlotRepairAdmin.ATRGetSlotDefInstalledComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Def Installed Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdefinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRResolveConflictedComponent = function() {
            smqSlotRepairAdmin.ATRResolveConflictedComponent('{}');
        }

        smqSlotRepairAdmin.ATRResolveConflictedComponent = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Resolve Conflicted Component - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.resolveconflictedcomponent', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetSlotDetails = function() {
            smqSlotRepairAdmin.ATRGetSlotDetails('{}');
        }

        smqSlotRepairAdmin.ATRGetSlotDetails = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Slot Details - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getslotdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.ATRGetSharedInstalledComponents = function() {
            smqSlotRepairAdmin.ATRGetSharedInstalledComponents('{}');
        }

        smqSlotRepairAdmin.ATRGetSharedInstalledComponents = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqATR.showPingPongs) console.log('Get Shared Installed Components - ');
            smqSlotRepairAdmin.client.send('/exchange/atrmic/gainscoordinator.atr.atr.getsharedinstalledcomponents', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSApi' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.GAINSApiAccessToken = function() {
            smqSlotRepairAdmin.GAINSApiAccessToken('{}');
        }

        smqSlotRepairAdmin.GAINSApiAccessToken = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSApi.showPingPongs) console.log('Access Token - A Gains API provides an access token to the coordinator');
            smqSlotRepairAdmin.client.send('/exchange/gainsapimic/gainscoordinator.account.gainsapi.accesstoken', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSCoordinator' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.GAINSCoordinatorAnnouncement = function() {
            smqSlotRepairAdmin.GAINSCoordinatorAnnouncement('{}');
        }

        smqSlotRepairAdmin.GAINSCoordinatorAnnouncement = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSCoordinator.showPingPongs) console.log('Announcement - Coordinator sends out an announcement/notification to all online/connected GAINS Users.');
            smqSlotRepairAdmin.client.send('/exchange/gainscoordinatormic/guest.general.gainscoordinator.announcement', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GamingAgent' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.GamingAgentPing = function() {
            smqSlotRepairAdmin.GamingAgentPing('{}');
        }

        smqSlotRepairAdmin.GamingAgentPing = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ping - GamingAgent establishes a connection with the coordinator');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.account.gamingagent.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentScheduleBJTournament = function() {
            smqSlotRepairAdmin.GamingAgentScheduleBJTournament('{}');
        }

        smqSlotRepairAdmin.GamingAgentScheduleBJTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule B J Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentCompleteTableAdd = function() {
            smqSlotRepairAdmin.GamingAgentCompleteTableAdd('{}');
        }

        smqSlotRepairAdmin.GamingAgentCompleteTableAdd = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Add - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentActivateTournament = function() {
            smqSlotRepairAdmin.GamingAgentActivateTournament('{}');
        }

        smqSlotRepairAdmin.GamingAgentActivateTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Activate Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentScheduleTableModification = function() {
            smqSlotRepairAdmin.GamingAgentScheduleTableModification('{}');
        }

        smqSlotRepairAdmin.GamingAgentScheduleTableModification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Modification - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentScheduleTableRemoval = function() {
            smqSlotRepairAdmin.GamingAgentScheduleTableRemoval('{}');
        }

        smqSlotRepairAdmin.GamingAgentScheduleTableRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Schedule Table Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentEndTournament = function() {
            smqSlotRepairAdmin.GamingAgentEndTournament('{}');
        }

        smqSlotRepairAdmin.GamingAgentEndTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('End Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentCompleteTableRemoval = function() {
            smqSlotRepairAdmin.GamingAgentCompleteTableRemoval('{}');
        }

        smqSlotRepairAdmin.GamingAgentCompleteTableRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Table Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentTableAddNotification = function() {
            smqSlotRepairAdmin.GamingAgentTableAddNotification('{}');
        }

        smqSlotRepairAdmin.GamingAgentTableAddNotification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Add Notification - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentTableGamesFeltChecklist = function() {
            smqSlotRepairAdmin.GamingAgentTableGamesFeltChecklist('{}');
        }

        smqSlotRepairAdmin.GamingAgentTableGamesFeltChecklist = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Table Games Felt Checklist - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.tablegamesfeltchecklist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentShuffleMasterVerification = function() {
            smqSlotRepairAdmin.GamingAgentShuffleMasterVerification('{}');
        }

        smqSlotRepairAdmin.GamingAgentShuffleMasterVerification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Shuffle Master Verification - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.shufflemasterverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRelicensingSearch = function() {
            smqSlotRepairAdmin.GamingAgentRelicensingSearch('{}');
        }

        smqSlotRepairAdmin.GamingAgentRelicensingSearch = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicensing Search - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicensingsearch', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRelicense = function() {
            smqSlotRepairAdmin.GamingAgentRelicense('{}');
        }

        smqSlotRepairAdmin.GamingAgentRelicense = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Relicense - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.relicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentGetRelicensesToRecheck = function() {
            smqSlotRepairAdmin.GamingAgentGetRelicensesToRecheck('{}');
        }

        smqSlotRepairAdmin.GamingAgentGetRelicensesToRecheck = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Relicenses To Recheck - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getrelicensestorecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentUnlicense = function() {
            smqSlotRepairAdmin.GamingAgentUnlicense('{}');
        }

        smqSlotRepairAdmin.GamingAgentUnlicense = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Unlicense - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.unlicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentResolveRecheck = function() {
            smqSlotRepairAdmin.GamingAgentResolveRecheck('{}');
        }

        smqSlotRepairAdmin.GamingAgentResolveRecheck = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Resolve Recheck - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.resolverecheck', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentGetGCInspectionRequiredList = function() {
            smqSlotRepairAdmin.GamingAgentGetGCInspectionRequiredList('{}');
        }

        smqSlotRepairAdmin.GamingAgentGetGCInspectionRequiredList = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get G C Inspection Required List - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getgcinspectionrequiredlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentGetFeltReviewList = function() {
            smqSlotRepairAdmin.GamingAgentGetFeltReviewList('{}');
        }

        smqSlotRepairAdmin.GamingAgentGetFeltReviewList = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Get Felt Review List - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.blackjack.gamingagent.getfeltreviewlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentCompleteApplyLicense = function() {
            smqSlotRepairAdmin.GamingAgentCompleteApplyLicense('{}');
        }

        smqSlotRepairAdmin.GamingAgentCompleteApplyLicense = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Apply License - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeapplylicense', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentCompleteRemoval = function() {
            smqSlotRepairAdmin.GamingAgentCompleteRemoval('{}');
        }

        smqSlotRepairAdmin.GamingAgentCompleteRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.completeremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentEditScheduledRemoval = function() {
            smqSlotRepairAdmin.GamingAgentEditScheduledRemoval('{}');
        }

        smqSlotRepairAdmin.GamingAgentEditScheduledRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Scheduled Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.storage.gamingagent.editscheduledremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentEditSealGC = function() {
            smqSlotRepairAdmin.GamingAgentEditSealGC('{}');
        }

        smqSlotRepairAdmin.GamingAgentEditSealGC = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seal G C - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealgc', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentEditSealsFloor = function() {
            smqSlotRepairAdmin.GamingAgentEditSealsFloor('{}');
        }

        smqSlotRepairAdmin.GamingAgentEditSealsFloor = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Edit Seals Floor - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.editsealsfloor', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentEmergencyDropInspection = function() {
            smqSlotRepairAdmin.GamingAgentEmergencyDropInspection('{}');
        }

        smqSlotRepairAdmin.GamingAgentEmergencyDropInspection = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Emergency Drop Inspection - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.emergencydropinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentGCInspection = function() {
            smqSlotRepairAdmin.GamingAgentGCInspection('{}');
        }

        smqSlotRepairAdmin.GamingAgentGCInspection = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('G C Inspection - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.gcinspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentJPVerify100K = function() {
            smqSlotRepairAdmin.GamingAgentJPVerify100K('{}');
        }

        smqSlotRepairAdmin.GamingAgentJPVerify100K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify100 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentJPVerify10K = function() {
            smqSlotRepairAdmin.GamingAgentJPVerify10K('{}');
        }

        smqSlotRepairAdmin.GamingAgentJPVerify10K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify10 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentJPVerify20K = function() {
            smqSlotRepairAdmin.GamingAgentJPVerify20K('{}');
        }

        smqSlotRepairAdmin.GamingAgentJPVerify20K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify20 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentJPVerify50K = function() {
            smqSlotRepairAdmin.GamingAgentJPVerify50K('{}');
        }

        smqSlotRepairAdmin.GamingAgentJPVerify50K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('J P Verify50 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.jpverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentMediaVerification = function() {
            smqSlotRepairAdmin.GamingAgentMediaVerification('{}');
        }

        smqSlotRepairAdmin.GamingAgentMediaVerification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Media Verification - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.mediaverification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRamClearPerform = function() {
            smqSlotRepairAdmin.GamingAgentRamClearPerform('{}');
        }

        smqSlotRepairAdmin.GamingAgentRamClearPerform = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Perform - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearperform', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentStackerFullRecord = function() {
            smqSlotRepairAdmin.GamingAgentStackerFullRecord('{}');
        }

        smqSlotRepairAdmin.GamingAgentStackerFullRecord = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Stacker Full Record - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stackerfullrecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentStateOfMinnesotaInspection = function() {
            smqSlotRepairAdmin.GamingAgentStateOfMinnesotaInspection('{}');
        }

        smqSlotRepairAdmin.GamingAgentStateOfMinnesotaInspection = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('State Of Minnesota Inspection - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.stateofminnesotainspection', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentCompleteConversionFloorAdv = function() {
            smqSlotRepairAdmin.GamingAgentCompleteConversionFloorAdv('{}');
        }

        smqSlotRepairAdmin.GamingAgentCompleteConversionFloorAdv = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Complete Conversion Floor Adv - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.completeconversionflooradv', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRamClearConversion = function() {
            smqSlotRepairAdmin.GamingAgentRamClearConversion('{}');
        }

        smqSlotRepairAdmin.GamingAgentRamClearConversion = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear Conversion - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramclearconversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRamClearToInspect = function() {
            smqSlotRepairAdmin.GamingAgentRamClearToInspect('{}');
        }

        smqSlotRepairAdmin.GamingAgentRamClearToInspect = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Inspect - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoinspect', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRamClearToActive = function() {
            smqSlotRepairAdmin.GamingAgentRamClearToActive('{}');
        }

        smqSlotRepairAdmin.GamingAgentRamClearToActive = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Ram Clear To Active - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.ramcleartoactive', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentRequestActivation = function() {
            smqSlotRepairAdmin.GamingAgentRequestActivation('{}');
        }

        smqSlotRepairAdmin.GamingAgentRequestActivation = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Request Activation - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.requestactivation', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify100K = function() {
            smqSlotRepairAdmin.GamingAgentSuspendedJPReverify100K('{}');
        }

        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify100K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify100 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify100k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify10K = function() {
            smqSlotRepairAdmin.GamingAgentSuspendedJPReverify10K('{}');
        }

        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify10K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify10 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify10k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify20K = function() {
            smqSlotRepairAdmin.GamingAgentSuspendedJPReverify20K('{}');
        }

        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify20K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify20 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify20k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify50K = function() {
            smqSlotRepairAdmin.GamingAgentSuspendedJPReverify50K('{}');
        }

        smqSlotRepairAdmin.GamingAgentSuspendedJPReverify50K = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Suspended J P Reverify50 K - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.suspendedjpreverify50k', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GamingAgentPreventativeMaintenanceRecord = function() {
            smqSlotRepairAdmin.GamingAgentPreventativeMaintenanceRecord('{}');
        }

        smqSlotRepairAdmin.GamingAgentPreventativeMaintenanceRecord = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGamingAgent.showPingPongs) console.log('Preventative Maintenance Record - ');
            smqSlotRepairAdmin.client.send('/exchange/gamingagentmic/gainscoordinator.onfloor.gamingagent.preventativemaintenancerecord', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'BJFeltLog' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.BJFeltLogPing = function() {
            smqSlotRepairAdmin.BJFeltLogPing('{}');
        }

        smqSlotRepairAdmin.BJFeltLogPing = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Ping - BJFeltLog establishes a connection with the coordinator');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.account.bjfeltlog.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogUpdateTableInfo = function() {
            smqSlotRepairAdmin.BJFeltLogUpdateTableInfo('{}');
        }

        smqSlotRepairAdmin.BJFeltLogUpdateTableInfo = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Update Table Info - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.updatetableinfo', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogCompleteTableModification = function() {
            smqSlotRepairAdmin.BJFeltLogCompleteTableModification('{}');
        }

        smqSlotRepairAdmin.BJFeltLogCompleteTableModification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Modification - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogEndTournament = function() {
            smqSlotRepairAdmin.BJFeltLogEndTournament('{}');
        }

        smqSlotRepairAdmin.BJFeltLogEndTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('End Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.endtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogScheduleTableRemoval = function() {
            smqSlotRepairAdmin.BJFeltLogScheduleTableRemoval('{}');
        }

        smqSlotRepairAdmin.BJFeltLogScheduleTableRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogServiceShuffleMaster = function() {
            smqSlotRepairAdmin.BJFeltLogServiceShuffleMaster('{}');
        }

        smqSlotRepairAdmin.BJFeltLogServiceShuffleMaster = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Service Shuffle Master - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.serviceshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogScheduleBJTournament = function() {
            smqSlotRepairAdmin.BJFeltLogScheduleBJTournament('{}');
        }

        smqSlotRepairAdmin.BJFeltLogScheduleBJTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule B J Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.schedulebjtournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogReceiveShuffleMaster = function() {
            smqSlotRepairAdmin.BJFeltLogReceiveShuffleMaster('{}');
        }

        smqSlotRepairAdmin.BJFeltLogReceiveShuffleMaster = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Receive Shuffle Master - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.receiveshufflemaster', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogTableAddNotification = function() {
            smqSlotRepairAdmin.BJFeltLogTableAddNotification('{}');
        }

        smqSlotRepairAdmin.BJFeltLogTableAddNotification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Table Add Notification - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.tableaddnotification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogActivateTournament = function() {
            smqSlotRepairAdmin.BJFeltLogActivateTournament('{}');
        }

        smqSlotRepairAdmin.BJFeltLogActivateTournament = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Activate Tournament - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.activatetournament', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogCompleteTableAdd = function() {
            smqSlotRepairAdmin.BJFeltLogCompleteTableAdd('{}');
        }

        smqSlotRepairAdmin.BJFeltLogCompleteTableAdd = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Add - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableadd', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogCompleteTableRemoval = function() {
            smqSlotRepairAdmin.BJFeltLogCompleteTableRemoval('{}');
        }

        smqSlotRepairAdmin.BJFeltLogCompleteTableRemoval = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Complete Table Removal - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.completetableremoval', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogScheduleTableModification = function() {
            smqSlotRepairAdmin.BJFeltLogScheduleTableModification('{}');
        }

        smqSlotRepairAdmin.BJFeltLogScheduleTableModification = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Schedule Table Modification - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.scheduletablemodification', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogLogFeltChange = function() {
            smqSlotRepairAdmin.BJFeltLogLogFeltChange('{}');
        }

        smqSlotRepairAdmin.BJFeltLogLogFeltChange = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Log Felt Change - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.logfeltchange', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogGetBlackTables = function() {
            smqSlotRepairAdmin.BJFeltLogGetBlackTables('{}');
        }

        smqSlotRepairAdmin.BJFeltLogGetBlackTables = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Tables - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogGetShuffleMasters = function() {
            smqSlotRepairAdmin.BJFeltLogGetShuffleMasters('{}');
        }

        smqSlotRepairAdmin.BJFeltLogGetShuffleMasters = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Shuffle Masters - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.BJFeltLogGetBlackTableProjects = function() {
            smqSlotRepairAdmin.BJFeltLogGetBlackTableProjects('{}');
        }

        smqSlotRepairAdmin.BJFeltLogGetBlackTableProjects = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqBJFeltLog.showPingPongs) console.log('Get Black Table Projects - ');
            smqSlotRepairAdmin.client.send('/exchange/bjfeltlogmic/gainscoordinator.blackjack.bjfeltlog.getblacktableprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'GAINSUser' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.GAINSUserPing = function() {
            smqSlotRepairAdmin.GAINSUserPing('{}');
        }

        smqSlotRepairAdmin.GAINSUserPing = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Ping - GAINSUser establishes a connection with the coordinator');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserMyRoles = function() {
            smqSlotRepairAdmin.GAINSUserMyRoles('{}');
        }

        smqSlotRepairAdmin.GAINSUserMyRoles = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('My Roles - Anyone can get a list of the roles that they are a member of');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.account.gainsuser.myroles', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetAssetCountsByWorkflow = function() {
            smqSlotRepairAdmin.GAINSUserGetAssetCountsByWorkflow('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetAssetCountsByWorkflow = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Counts By Workflow - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetcountsbyworkflow', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetGamingLocations = function() {
            smqSlotRepairAdmin.GAINSUserGetGamingLocations('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetGamingLocations = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Gaming Locations - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getgaminglocations', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetRelevantActions = function() {
            smqSlotRepairAdmin.GAINSUserGetRelevantActions('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetRelevantActions = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Relevant Actions - Will take a list of assets, and return the actions that the current user is allowed to perform on them, with the assets that the action applies to grouped under them.');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.blackjack.gainsuser.getrelevantactions', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetVersion = function() {
            smqSlotRepairAdmin.GAINSUserGetVersion('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetVersion = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Version - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getversion', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetAssetStatuses = function() {
            smqSlotRepairAdmin.GAINSUserGetAssetStatuses('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetAssetStatuses = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Asset Statuses - Gets a list of Assets for the given workflow state');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetstatuses', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetAssetsByStatus = function() {
            smqSlotRepairAdmin.GAINSUserGetAssetsByStatus('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetAssetsByStatus = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Assets By Status - Gets a list of assets in the given status.');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getassetsbystatus', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetFilteredAssetList = function() {
            smqSlotRepairAdmin.GAINSUserGetFilteredAssetList('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetFilteredAssetList = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Filtered Asset List - Gets a list of Assets for the given workflow state');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getfilteredassetlist', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetProjects = function() {
            smqSlotRepairAdmin.GAINSUserGetProjects('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetProjects = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Projects - Gets a list of upcoming projects (by default). Closed projects should also be queriable, but for now, it will just list open projects.');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserUpdateProject = function() {
            smqSlotRepairAdmin.GAINSUserUpdateProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserUpdateProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project - Updates a project as requested (maybe adding/removing slots from the list).');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserAddProject = function() {
            smqSlotRepairAdmin.GAINSUserAddProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserAddProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project - Creates a new project in the system');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetProjectBanks = function() {
            smqSlotRepairAdmin.GAINSUserGetProjectBanks('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetProjectBanks = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Project Banks - Gets a list of banks (and associated tables) for the given user');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserAddProjectAsset = function() {
            smqSlotRepairAdmin.GAINSUserAddProjectAsset('{}');
        }

        smqSlotRepairAdmin.GAINSUserAddProjectAsset = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Project Asset - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserRemoveProjectAsset = function() {
            smqSlotRepairAdmin.GAINSUserRemoveProjectAsset('{}');
        }

        smqSlotRepairAdmin.GAINSUserRemoveProjectAsset = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Project Asset - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeprojectasset', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchBJTables = function() {
            smqSlotRepairAdmin.GAINSUserSearchBJTables('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchBJTables = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search B J Tables - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchbjtables', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchATRs = function() {
            smqSlotRepairAdmin.GAINSUserSearchATRs('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchATRs = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search A T Rs - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchatrs', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchStoredSlots = function() {
            smqSlotRepairAdmin.GAINSUserSearchStoredSlots('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchStoredSlots = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Stored Slots - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchstoredslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchOnFloorSlots = function() {
            smqSlotRepairAdmin.GAINSUserSearchOnFloorSlots('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchOnFloorSlots = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search On Floor Slots - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchonfloorslots', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchShuffleMasters = function() {
            smqSlotRepairAdmin.GAINSUserSearchShuffleMasters('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchShuffleMasters = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Shuffle Masters - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchshufflemasters', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserUpdateProjectBanks = function() {
            smqSlotRepairAdmin.GAINSUserUpdateProjectBanks('{}');
        }

        smqSlotRepairAdmin.GAINSUserUpdateProjectBanks = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Update Project Banks - Takes a project (with bank/table info and makes the database match).');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.updateprojectbanks', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserDeleteProject = function() {
            smqSlotRepairAdmin.GAINSUserDeleteProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserDeleteProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Delete Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.deleteproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserCompleteProject = function() {
            smqSlotRepairAdmin.GAINSUserCompleteProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserCompleteProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Complete Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.completeproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetCompletedProjects = function() {
            smqSlotRepairAdmin.GAINSUserGetCompletedProjects('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetCompletedProjects = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Completed Projects - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getcompletedprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetSlotProjects = function() {
            smqSlotRepairAdmin.GAINSUserGetSlotProjects('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetSlotProjects = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Projects - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotprojects', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetSlotProject = function() {
            smqSlotRepairAdmin.GAINSUserGetSlotProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetSlotProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserCreateSlotProject = function() {
            smqSlotRepairAdmin.GAINSUserCreateSlotProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserCreateSlotProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Create Slot Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.createslotproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserAddSlotToProject = function() {
            smqSlotRepairAdmin.GAINSUserAddSlotToProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserAddSlotToProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Add Slot To Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.addslottoproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserRemoveSlotFromProject = function() {
            smqSlotRepairAdmin.GAINSUserRemoveSlotFromProject('{}');
        }

        smqSlotRepairAdmin.GAINSUserRemoveSlotFromProject = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Remove Slot From Project - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.removeslotfromproject', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetAllPeople = function() {
            smqSlotRepairAdmin.GAINSUserGetAllPeople('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetAllPeople = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get All People - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getallpeople', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetSlotViewDetails = function() {
            smqSlotRepairAdmin.GAINSUserGetSlotViewDetails('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetSlotViewDetails = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Slot View Details - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getslotviewdetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetPersonByBadgeNumber = function() {
            smqSlotRepairAdmin.GAINSUserGetPersonByBadgeNumber('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetPersonByBadgeNumber = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Person By Badge Number - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.getpersonbybadgenumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserValidateNewSealNumber = function() {
            smqSlotRepairAdmin.GAINSUserValidateNewSealNumber('{}');
        }

        smqSlotRepairAdmin.GAINSUserValidateNewSealNumber = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Validate New Seal Number - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.validatenewsealnumber', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchGameName = function() {
            smqSlotRepairAdmin.GAINSUserSearchGameName('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchGameName = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Game Name - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchgamename', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserSearchProgressiveDef = function() {
            smqSlotRepairAdmin.GAINSUserSearchProgressiveDef('{}');
        }

        smqSlotRepairAdmin.GAINSUserSearchProgressiveDef = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Search Progressive Def - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.assets.gainsuser.searchprogressivedef', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GAINSUserGetConversionDetails = function() {
            smqSlotRepairAdmin.GAINSUserGetConversionDetails('{}');
        }

        smqSlotRepairAdmin.GAINSUserGetConversionDetails = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGAINSUser.showPingPongs) console.log('Get Conversion Details - ');
            smqSlotRepairAdmin.client.send('/exchange/gainsusermic/gainscoordinator.onfloor.gainsuser.getconversiondetails', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
            // Can also say what 'Guest' can say.
            
        
        smqSlotRepairAdmin.waitFor = function (id) {
            setTimeout(function () {
                var waiting = smqSlotRepairAdmin.waitingReply[id];
                if (waiting) {
                    waiting.reject("Timed out waiting for reply");
                }
            }, 30000)
        }
        
        smqSlotRepairAdmin.createUUID = function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        
        smqSlotRepairAdmin.GuestPing = function() {
            smqSlotRepairAdmin.GuestPing('{}');
        }

        smqSlotRepairAdmin.GuestPing = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGuest.showPingPongs) console.log('Ping - Guest establishes a connection with the coordinator');
            smqSlotRepairAdmin.client.send('/exchange/guestmic/gainscoordinator.account.guest.ping', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        
        smqSlotRepairAdmin.GuestLogin = function() {
            smqSlotRepairAdmin.GuestLogin('{}');
        }

        smqSlotRepairAdmin.GuestLogin = function(payload) {
            payload = smqSlotRepairAdmin.stringifyValue(payload);
            var id = smqSlotRepairAdmin.createUUID();
            var deferred = smqSlotRepairAdmin.waitingReply[id] = smqSlotRepairAdmin.defer();
            if (smqGuest.showPingPongs) console.log('Login - A Previously Unauthenticated Guest Logs in. If approved, their GAINSUser object is returned.');
            smqSlotRepairAdmin.client.send('/exchange/guestmic/gainscoordinator.account.guest.login', { "content-type": "text/plain", "reply-to":"/temp-queue/response-queue", "correlation-id":id }, payload);
            
            smqSlotRepairAdmin.waitFor(id);
            
            return deferred.promise;
        }
        

    return smqSlotRepairAdmin;
}

